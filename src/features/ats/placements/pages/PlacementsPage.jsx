import { useEffect, useState } from "react";
import AppShell from "@/components/layout/AppShell";
import { useAuth } from "@/contexts/AuthContext";
import { listSubmissions } from "@/services/ats/submissions";
import { createPlacement, listPlacements } from "@/services/ats/placements";

const emptyForm = {
  submission_id: "",
  start_date: "",
  end_date: "",
  placement_type: "contract",
  bill_rate: "",
  pay_rate: "",
  status: "active",
  notes: "",
};

export default function PlacementsPage() {
  const { authUser } = useAuth();
  const [placements, setPlacements] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);

  async function loadPage() {
    if (!authUser) return;
    setLoading(true);
    try {
      const [placementsData, submissionsData] = await Promise.all([
        listPlacements(authUser),
        listSubmissions(authUser),
      ]);
      setPlacements(placementsData);
      setSubmissions(submissionsData.filter((s) => s.status === "placed" || s.status === "offered"));
    } catch (error) {
      console.error(error);
      alert(error.message || "Failed to load placements");
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
      await createPlacement(authUser, form);
      setForm(emptyForm);
      await loadPage();
    } catch (error) {
      console.error(error);
      alert(error.message || "Failed to create placement");
    }
  }

  return (
    <AppShell>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Placements</h1>

        <form onSubmit={handleSubmit} className="rounded-xl border bg-white p-4 space-y-3">
          <div className="grid gap-3 md:grid-cols-2">
            <select
              className="w-full rounded border p-3"
              value={form.submission_id}
              onChange={(e) => setForm((s) => ({ ...s, submission_id: e.target.value }))}
              required
            >
              <option value="">Select submission</option>
              {submissions.map((submission) => (
                <option key={submission.id} value={submission.id}>
                  {(submission.job?.title || "Job")} — {(submission.candidate
                    ? [submission.candidate.first_name, submission.candidate.last_name]
                        .filter(Boolean)
                        .join(" ")
                    : "Candidate")}
                </option>
              ))}
            </select>

            <select
              className="w-full rounded border p-3"
              value={form.placement_type}
              onChange={(e) => setForm((s) => ({ ...s, placement_type: e.target.value }))}
            >
              <option value="contract">contract</option>
              <option value="full_time">full_time</option>
              <option value="contract_to_hire">contract_to_hire</option>
            </select>

            <input
              className="w-full rounded border p-3"
              type="date"
              value={form.start_date}
              onChange={(e) => setForm((s) => ({ ...s, start_date: e.target.value }))}
              required
            />

            <input
              className="w-full rounded border p-3"
              type="date"
              value={form.end_date}
              onChange={(e) => setForm((s) => ({ ...s, end_date: e.target.value }))}
            />

            <input
              className="w-full rounded border p-3"
              type="number"
              step="0.01"
              placeholder="Bill rate"
              value={form.bill_rate}
              onChange={(e) => setForm((s) => ({ ...s, bill_rate: e.target.value }))}
            />

            <input
              className="w-full rounded border p-3"
              type="number"
              step="0.01"
              placeholder="Pay rate"
              value={form.pay_rate}
              onChange={(e) => setForm((s) => ({ ...s, pay_rate: e.target.value }))}
            />
          </div>

          <textarea
            className="w-full rounded border p-3"
            placeholder="Notes"
            value={form.notes}
            onChange={(e) => setForm((s) => ({ ...s, notes: e.target.value }))}
          />

          <button className="rounded bg-slate-900 px-4 py-2 text-white">
            Create Placement
          </button>
        </form>

        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="overflow-hidden rounded-xl border bg-white">
            <table className="w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="p-3 text-left">Job</th>
                  <th className="p-3 text-left">Candidate</th>
                  <th className="p-3 text-left">Start</th>
                  <th className="p-3 text-left">Type</th>
                  <th className="p-3 text-left">Bill Rate</th>
                  <th className="p-3 text-left">Pay Rate</th>
                </tr>
              </thead>
              <tbody>
                {placements.map((placement) => (
                  <tr key={placement.id} className="border-t">
                    <td className="p-3">{placement.submission?.job?.title || "-"}</td>
                    <td className="p-3">
                      {placement.submission?.candidate
                        ? [
                            placement.submission.candidate.first_name,
                            placement.submission.candidate.last_name,
                          ]
                            .filter(Boolean)
                            .join(" ")
                        : "-"}
                    </td>
                    <td className="p-3">{placement.start_date}</td>
                    <td className="p-3">{placement.placement_type}</td>
                    <td className="p-3">{placement.bill_rate ?? "-"}</td>
                    <td className="p-3">{placement.pay_rate ?? "-"}</td>
                  </tr>
                ))}
                {!placements.length ? (
                  <tr>
                    <td colSpan="6" className="p-6 text-center text-slate-500">
                      No placements yet.
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