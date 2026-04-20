import { useEffect, useState } from "react";
import AppShell from "@/components/layout/AppShell";
import { useAuth } from "@/contexts/AuthContext";
import { listPlacements } from "@/services/ats/placements";
import { createTimesheet, listTimesheets } from "@/services/workforce/timesheets";

const emptyForm = {
  placement_id: "",
  week_start_date: "",
  week_end_date: "",
  status: "draft",
  notes: "",
  entries: [
    { work_date: "", hours: "", notes: "" },
  ],
};

export default function TimesheetsPage() {
  const { authUser } = useAuth();
  const [timesheets, setTimesheets] = useState([]);
  const [placements, setPlacements] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);

  async function loadPage() {
    if (!authUser) return;
    setLoading(true);
    try {
      const [timesheetsData, placementsData] = await Promise.all([
        listTimesheets(authUser),
        listPlacements(authUser),
      ]);
      setTimesheets(timesheetsData);
      setPlacements(placementsData);
    } catch (error) {
      console.error(error);
      alert(error.message || "Failed to load timesheets");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPage();
  }, [authUser]);

  function updateEntry(index, field, value) {
    setForm((prev) => {
      const entries = [...prev.entries];
      entries[index] = { ...entries[index], [field]: value };
      return { ...prev, entries };
    });
  }

  function addEntryRow() {
    setForm((prev) => ({
      ...prev,
      entries: [...prev.entries, { work_date: "", hours: "", notes: "" }],
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await createTimesheet(authUser, form);
      setForm(emptyForm);
      await loadPage();
    } catch (error) {
      console.error(error);
      alert(error.message || "Failed to create timesheet");
    }
  }

  return (
    <AppShell>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Timesheets</h1>

        <form onSubmit={handleSubmit} className="rounded-xl border bg-white p-4 space-y-4">
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
              value={form.status}
              onChange={(e) => setForm((s) => ({ ...s, status: e.target.value }))}
            >
              <option value="draft">draft</option>
              <option value="submitted">submitted</option>
            </select>

            <input
              className="w-full rounded border p-3"
              type="date"
              value={form.week_start_date}
              onChange={(e) => setForm((s) => ({ ...s, week_start_date: e.target.value }))}
              required
            />

            <input
              className="w-full rounded border p-3"
              type="date"
              value={form.week_end_date}
              onChange={(e) => setForm((s) => ({ ...s, week_end_date: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-3">
            <div className="font-medium">Entries</div>
            {form.entries.map((entry, index) => (
              <div key={index} className="grid gap-3 md:grid-cols-3">
                <input
                  className="w-full rounded border p-3"
                  type="date"
                  value={entry.work_date}
                  onChange={(e) => updateEntry(index, "work_date", e.target.value)}
                  required
                />
                <input
                  className="w-full rounded border p-3"
                  type="number"
                  step="0.25"
                  placeholder="Hours"
                  value={entry.hours}
                  onChange={(e) => updateEntry(index, "hours", e.target.value)}
                  required
                />
                <input
                  className="w-full rounded border p-3"
                  placeholder="Notes"
                  value={entry.notes}
                  onChange={(e) => updateEntry(index, "notes", e.target.value)}
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addEntryRow}
              className="rounded border px-4 py-2"
            >
              Add Entry
            </button>
          </div>

          <textarea
            className="w-full rounded border p-3"
            placeholder="Notes"
            value={form.notes}
            onChange={(e) => setForm((s) => ({ ...s, notes: e.target.value }))}
          />

          <button className="rounded bg-slate-900 px-4 py-2 text-white">
            Create Timesheet
          </button>
        </form>

        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="space-y-4">
            {timesheets.map((timesheet) => (
              <div key={timesheet.id} className="rounded-xl border bg-white p-4">
                <div className="font-semibold">
                  {timesheet.placement?.submission?.job?.title || "-"} —{" "}
                  {timesheet.placement?.submission?.candidate
                    ? [
                        timesheet.placement.submission.candidate.first_name,
                        timesheet.placement.submission.candidate.last_name,
                      ]
                        .filter(Boolean)
                        .join(" ")
                    : "-"}
                </div>
                <div className="mt-1 text-sm text-slate-600">
                  {timesheet.week_start_date} to {timesheet.week_end_date} • {timesheet.total_hours} hrs • {timesheet.status}
                </div>
              </div>
            ))}
            {!timesheets.length ? (
              <div className="rounded-xl border bg-white p-6 text-center text-slate-500">
                No timesheets yet.
              </div>
            ) : null}
          </div>
        )}
      </div>
    </AppShell>
  );
}