import { useEffect, useState } from "react";
import AppShell from "@/components/layout/AppShell";
import { useAuth } from "@/contexts/AuthContext";
import { listPlacements } from "@/services/ats/placements";
import {
  completeOnboardingItem,
  createOnboardingItem,
  listOnboardingItems,
} from "@/services/workforce/onboarding";

const emptyForm = {
  placement_id: "",
  item_type: "document",
  title: "",
  description: "",
  due_date: "",
  status: "pending",
};

export default function OnboardingPage() {
  const { authUser } = useAuth();
  const [items, setItems] = useState([]);
  const [placements, setPlacements] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);

  async function loadPage() {
    if (!authUser) return;
    setLoading(true);
    try {
      const [itemsData, placementsData] = await Promise.all([
        listOnboardingItems(authUser),
        listPlacements(authUser),
      ]);
      setItems(itemsData);
      setPlacements(placementsData);
    } catch (error) {
      console.error(error);
      alert(error.message || "Failed to load onboarding");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPage();
  }, [authUser]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await createOnboardingItem(authUser, form);
      setForm(emptyForm);
      await loadPage();
    } catch (error) {
      console.error(error);
      alert(error.message || "Failed to create onboarding item");
    }
  }

  async function handleComplete(id) {
    try {
      await completeOnboardingItem(authUser, id);
      await loadPage();
    } catch (error) {
      console.error(error);
      alert(error.message || "Failed to complete onboarding item");
    }
  }

  return (
    <AppShell>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Onboarding</h1>

        <form onSubmit={handleSubmit} className="rounded-xl border bg-white p-4 space-y-3">
          <div className="grid gap-3 md:grid-cols-2">
            <select
              className="w-full rounded border p-3"
              value={form.placement_id}
              onChange={(e) => setForm((s) => ({ ...s, placement_id: e.target.value }))}
              required
            >
              <option value="">Select placement</option>
              {placements.map((placement) => (
                <option key={placement.id} value={placement.id}>
                  {(placement.submission?.job?.title || "Job")} — {(placement.submission?.candidate
                    ? [placement.submission.candidate.first_name, placement.submission.candidate.last_name]
                        .filter(Boolean)
                        .join(" ")
                    : "Candidate")}
                </option>
              ))}
            </select>

            <select
              className="w-full rounded border p-3"
              value={form.item_type}
              onChange={(e) => setForm((s) => ({ ...s, item_type: e.target.value }))}
            >
              <option value="document">document</option>
              <option value="compliance">compliance</option>
              <option value="equipment">equipment</option>
              <option value="orientation">orientation</option>
            </select>

            <input
              className="w-full rounded border p-3 md:col-span-2"
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm((s) => ({ ...s, title: e.target.value }))}
              required
            />

            <input
              className="w-full rounded border p-3"
              type="date"
              value={form.due_date}
              onChange={(e) => setForm((s) => ({ ...s, due_date: e.target.value }))}
            />
          </div>

          <textarea
            className="w-full rounded border p-3"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm((s) => ({ ...s, description: e.target.value }))}
          />

          <button className="rounded bg-slate-900 px-4 py-2 text-white">
            Create Onboarding Item
          </button>
        </form>

        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="overflow-hidden rounded-xl border bg-white">
            <table className="w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="p-3 text-left">Candidate</th>
                  <th className="p-3 text-left">Title</th>
                  <th className="p-3 text-left">Type</th>
                  <th className="p-3 text-left">Due</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-t">
                    <td className="p-3">
                      {item.placement?.submission?.candidate
                        ? [
                            item.placement.submission.candidate.first_name,
                            item.placement.submission.candidate.last_name,
                          ]
                            .filter(Boolean)
                            .join(" ")
                        : "-"}
                    </td>
                    <td className="p-3">{item.title}</td>
                    <td className="p-3">{item.item_type}</td>
                    <td className="p-3">{item.due_date || "-"}</td>
                    <td className="p-3">{item.status}</td>
                    <td className="p-3">
                      {item.status !== "completed" ? (
                        <button
                          onClick={() => handleComplete(item.id)}
                          className="rounded border px-3 py-1"
                        >
                          Complete
                        </button>
                      ) : (
                        <span className="text-slate-500">Done</span>
                      )}
                    </td>
                  </tr>
                ))}
                {!items.length ? (
                  <tr>
                    <td colSpan="6" className="p-6 text-center text-slate-500">
                      No onboarding items yet.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AppShell>
  );
}