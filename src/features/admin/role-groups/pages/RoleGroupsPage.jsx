import { useEffect, useState } from "react";
import AppShell from "@/components/layout/AppShell";
import { useAuth } from "@/contexts/AuthContext";
import { createRoleGroup, listRoleGroups } from "@/services/core/roleGroups";

export default function RoleGroupsPage() {
  const { authUser } = useAuth();
  const [groups, setGroups] = useState([]);
  const [form, setForm] = useState({ name: "", description: "" });
  const [loading, setLoading] = useState(true);

  async function loadGroups() {
    if (!authUser) return;
    setLoading(true);
    try {
      const data = await listRoleGroups(authUser);
      setGroups(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadGroups();
  }, [authUser]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await createRoleGroup(authUser, form);
      setForm({ name: "", description: "" });
      await loadGroups();
    } catch (error) {
      console.error(error);
      alert(error.message || "Failed to create role group");
    }
  }

  return (
    <AppShell>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Role Groups</h1>

        <form
          onSubmit={handleSubmit}
          className="rounded-xl border bg-white p-4 space-y-3"
        >
          <input
            className="w-full rounded border p-3"
            placeholder="Role group name"
            value={form.name}
            onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
          />
          <textarea
            className="w-full rounded border p-3"
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm((s) => ({ ...s, description: e.target.value }))
            }
          />
          <button className="rounded bg-slate-900 px-4 py-2 text-white">
            Create Role Group
          </button>
        </form>

        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {groups.map((group) => (
              <div key={group.id} className="rounded-xl border bg-white p-4">
                <div className="font-semibold">{group.name}</div>
                <div className="mt-1 text-sm text-slate-500">
                  {group.description || "No description"}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}