import { useEffect, useState } from "react";
import AppShell from "@/components/layout/AppShell";
import { useAuth } from "@/contexts/AuthContext";
import { listSubmissions } from "@/services/ats/submissions";
import { createInterview, listInterviews } from "@/services/ats/interviews";

const emptyForm = {
  submission_id: "",
  interview_type: "screening",
  scheduled_at: "",
  duration_minutes: 30,
  interviewer_name: "",
  location: "",
  meeting_link: "",
  status: "scheduled",
  feedback: "",
};

export default function InterviewsPage() {
  const { authUser } = useAuth();
  const [interviews, setInterviews] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);

  async function loadPage() {
    if (!authUser) return;
    setLoading(true);
    try {
      const [interviewsData, submissionsData] = await Promise.all([
        listInterviews(authUser),
        listSubmissions(authUser),
      ]);
      setInterviews(interviewsData);
      setSubmissions(submissionsData);
    } catch (error) {
      console.error(error);
      alert(error.message || "Failed to load interviews");
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
      await createInterview(authUser, {
        ...form,
        scheduled_at: new Date(form.scheduled_at).toISOString(),
      });
      setForm(emptyForm);
      await loadPage();
    } catch (error) {
      console.error(error);
      alert(error.message || "Failed to create interview");
    }
  }

  return (
    <AppShell>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Interviews</h1>

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
              value={form.interview_type}
              onChange={(e) => setForm((s) => ({ ...s, interview_type: e.target.value }))}
            >
              <option value="screening">screening</option>
              <option value="technical">technical</option>
              <option value="client">client</option>
              <option value="final">final</option>
            </select>

            <input
              className="w-full rounded border p-3"
              type="datetime-local"
              value={form.scheduled_at}
              onChange={(e) => setForm((s) => ({ ...s, scheduled_at: e.target.value }))}
              required
            />

            <input
              className="w-full rounded border p-3"
              type="number"
              placeholder="Duration minutes"
              value={form.duration_minutes}
              onChange={(e) => setForm((s) => ({ ...s, duration_minutes: e.target.value }))}
            />

            <input
              className="w-full rounded border p-3"
              placeholder="Interviewer name"
              value={form.interviewer_name}
              onChange={(e) => setForm((s) => ({ ...s, interviewer_name: e.target.value }))}
            />

            <input
              className="w-full rounded border p-3"
              placeholder="Location"
              value={form.location}
              onChange={(e) => setForm((s) => ({ ...s, location: e.target.value }))}
            />

            <input
              className="w-full rounded border p-3 md:col-span-2"
              placeholder="Meeting link"
              value={form.meeting_link}
              onChange={(e) => setForm((s) => ({ ...s, meeting_link: e.target.value }))}
            />
          </div>

          <button className="rounded bg-slate-900 px-4 py-2 text-white">
            Schedule Interview
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
                  <th className="p-3 text-left">Type</th>
                  <th className="p-3 text-left">Scheduled</th>
                  <th className="p-3 text-left">Interviewer</th>
                  <th className="p-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {interviews.map((interview) => (
                  <tr key={interview.id} className="border-t">
                    <td className="p-3">{interview.submission?.job?.title || "-"}</td>
                    <td className="p-3">
                      {interview.submission?.candidate
                        ? [
                            interview.submission.candidate.first_name,
                            interview.submission.candidate.last_name,
                          ]
                            .filter(Boolean)
                            .join(" ")
                        : "-"}
                    </td>
                    <td className="p-3">{interview.interview_type}</td>
                    <td className="p-3">
                      {new Date(interview.scheduled_at).toLocaleString()}
                    </td>
                    <td className="p-3">{interview.interviewer_name || "-"}</td>
                    <td className="p-3">{interview.status}</td>
                  </tr>
                ))}
                {!interviews.length ? (
                  <tr>
                    <td colSpan="6" className="p-6 text-center text-slate-500">
                      No interviews yet.
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