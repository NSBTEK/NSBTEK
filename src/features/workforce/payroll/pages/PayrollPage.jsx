import { useEffect, useState } from "react";
import AppShell from "@/components/layout/AppShell";
import { useAuth } from "@/contexts/AuthContext";
import { listPlacements } from "@/services/ats/placements";
import { createPayrollRun, listPayrollRuns } from "@/services/workforce/payroll";

const emptyForm = {
  period_start: "",
  period_end: "",
  status: "draft",
  notes: "",
  items: [
    {
      placement_id: "",
      employee_id: "",
      regular_hours: "",
      overtime_hours: "",
      gross_pay: "",
      notes: "",
    },
  ],
};

export default function PayrollPage() {
  const { authUser } = useAuth();
  const [payrollRuns, setPayrollRuns] = useState([]);
  const [placements, setPlacements] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);

  async function loadPage() {
    if (!authUser) return;
    setLoading(true);
    try {
      const [runsData, placementsData] = await Promise.all([
        listPayrollRuns(authUser),
        listPlacements(authUser),
      ]);
      setPayrollRuns(runsData);
      setPlacements(placementsData);
    } catch (error) {
      console.error(error);
      alert(error.message || "Failed to load payroll");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPage();
  }, [authUser]);

  function updateItem(index, field, value) {
    setForm((prev) => {
      const items = [...prev.items];
      items[index] = { ...items[index], [field]: value };
      return { ...prev, items };
    });
  }

  function addItemRow() {
    setForm((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          placement_id: "",
          employee_id: "",
          regular_hours: "",
          overtime_hours: "",
          gross_pay: "",
          notes: "",
        },
      ],
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await createPayrollRun(authUser, form);
      setForm(emptyForm);
      await loadPage();
    } catch (error) {
      console.error(error);
      alert(error.message || "Failed to create payroll run");
    }
  }

  return (
    <AppShell>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Payroll</h1>

        <form onSubmit={handleSubmit} className="rounded-xl border bg-white p-4 space-y-4">
          <div className="grid gap-3 md:grid-cols-2">
            <input
              className="w-full rounded border p-3"
              type="date"
              value={form.period_start}
              onChange={(e) => setForm((s) => ({ ...s, period_start: e.target.value }))}
              required
            />
            <input
              className="w-full rounded border p-3"
              type="date"
              value={form.period_end}
              onChange={(e) => setForm((s) => ({ ...s, period_end: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-3">
            <div className="font-medium">Payroll Items</div>
            {form.items.map((item, index) => (
              <div key={index} className="grid gap-3 md:grid-cols-4">
                <select
                  className="w-full rounded border p-3"
                  value={item.placement_id}
                  onChange={(e) => updateItem(index, "placement_id", e.target.value)}
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

                <input
                  className="w-full rounded border p-3"
                  type="number"
                  step="0.25"
                  placeholder="Regular hours"
                  value={item.regular_hours}
                  onChange={(e) => updateItem(index, "regular_hours", e.target.value)}
                />

                <input
                  className="w-full rounded border p-3"
                  type="number"
                  step="0.25"
                  placeholder="Overtime hours"
                  value={item.overtime_hours}
                  onChange={(e) => updateItem(index, "overtime_hours", e.target.value)}
                />

                <input
                  className="w-full rounded border p-3"
                  type="number"
                  step="0.01"
                  placeholder="Gross pay"
                  value={item.gross_pay}
                  onChange={(e) => updateItem(index, "gross_pay", e.target.value)}
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addItemRow}
              className="rounded border px-4 py-2"
            >
              Add Payroll Item
            </button>
          </div>

          <textarea
            className="w-full rounded border p-3"
            placeholder="Notes"
            value={form.notes}
            onChange={(e) => setForm((s) => ({ ...s, notes: e.target.value }))}
          />

          <button className="rounded bg-slate-900 px-4 py-2 text-white">
            Create Payroll Run
          </button>
        </form>

        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="space-y-4">
            {payrollRuns.map((run) => (
              <div key={run.id} className="rounded-xl border bg-white p-4">
                <div className="font-semibold">
                  {run.period_start} to {run.period_end}
                </div>
                <div className="mt-1 text-sm text-slate-600">
                  {run.status} • Total Gross Pay: {run.total_gross_pay}
                </div>
              </div>
            ))}
            {!payrollRuns.length ? (
              <div className="rounded-xl border bg-white p-6 text-center text-slate-500">
                No payroll runs yet.
              </div>
            ) : null}
          </div>
        )}
      </div>
    </AppShell>
  );
}