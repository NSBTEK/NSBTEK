import { useEffect, useState } from "react";
import AppShell from "@/components/layout/AppShell";
import { useAuth } from "@/contexts/AuthContext";
import { listUsers, updateUserProfile } from "@/services/core/users";

export default function UserManagementPage() {
  const { authUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState(null);

  async function loadUsers() {
    if (!authUser) return;
    setLoading(true);
    try {
      const data = await listUsers(authUser);
      setUsers(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUsers();
  }, [authUser]);

  async function handleRoleChange(user, role) {
    try {
      setSavingId(user.id);
      await updateUserProfile(authUser, user.id, {
        ...user,
        role,
      });
      await loadUsers();
    } catch (error) {
      console.error(error);
      alert(error.message || "Failed to update user");
    } finally {
      setSavingId(null);
    }
  }

  return (
    <AppShell>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">User Management</h1>

        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="overflow-hidden rounded-xl border bg-white">
            <table className="w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Role</th>
                  <th className="p-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-t">
                    <td className="p-3">{user.full_name || "-"}</td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3">
                      <select
                        className="rounded border px-2 py-1"
                        value={user.role}
                        disabled={savingId === user.id}
                        onChange={(e) => handleRoleChange(user, e.target.value)}
                      >
                        <option value="platform_admin">platform_admin</option>
                        <option value="company_admin">company_admin</option>
                        <option value="manager">manager</option>
                        <option value="employee">employee</option>
                      </select>
                    </td>
                    <td className="p-3">{user.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AppShell>
  );
}