import { useEffect, useState } from "react";
import AppShell from "@/components/layout/AppShell";
import { useAuth } from "@/contexts/AuthContext";
import { listJobs } from "@/services/ats/jobs";
import { listCandidates } from "@/services/ats/candidates";
import {
  createSubmission,
  listSubmissions,
  updateSubmissionStatus,
} from "@/services/ats/submissions";

const emptyForm = {
  job_id: "",
  candidate_id: "",
  status: "submitted",
  notes: "",
};

export default function SubmissionsPage() {
  const { authUser } = useAuth();
  const [submissions, setSubmissions] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);

  async function loadPage() {
    if (!authUser) return;
    setLoading(true);
    try {
      const [submissionsData, jobsData, candidatesData] = await Promise.all([
        listSubmissions(authUser),
        listJobs(authUser),
        listCandidates(authUser),
      ]);
      setSubmissions(submissionsData);
      setJobs(jobsData);
      setCandidates(candidatesData);
    } catch (error) {
      console.error(error);
      alert(error.message || "Failed to load submissions");
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
      await createSubmission(authUser, form);
      setForm(emptyForm);
      await loadPage();
    } catch (error) {
      console.error(error);
      alert(error.message || "Failed to create submission");
    }
  }

  async function handleStatusChange(submissionId, status) {
    try {
      await updateSubmissionStatus(authUser, submissionId, status);
      await loadPage();
    } catch (error) {
      console.error(error);
      alert(error.message || "Failed to update submission");
    }
  }

  return (
    <AppShell>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Submissions</h1>

        <form onSubmit={handleSubmit} className="rounded-xl border bg-white p-4 space-y-3">
          <div className="grid gap-3 md:grid-cols-2">
            <select
              className="w-full rounded border p-3"
              value={form.job_id}
              onChange={(e) => setForm((s) => ({ ...s, job_id: e.target.value }))}
              required
            >
              <option value="">Select job</option>
              {jobs.map((job) => (
                <option key={job.id} value={job.id}>
                  {job.title}
                </option>
              ))}
            </select>

            <select
              className="w-full rounded border p-3"
              value={form.candidate_id}
              onChange={(e) => setForm((s) => ({ ...s, candidate_id: e.target.value }))}
              required
            >
              <option value="">Select candidate</option>
              {candidates.map((candidate) => (
                <option key={candidate.id} value={candidate.id}>
                  {[candidate.first_name, candidate.last_name].filter(Boolean).join(" ")}
                </option>
              ))}
            </select>

            <select
              className="w-full rounded border p-3"
              value={form.status}
              onChange={(e) => setForm((s) => ({ ...s, status: e.target.value }))}
            >
              <option value="submitted">submitted</option>
              <option value="review">review</option>
              <option value="rejected">rejected</option>
            </select>
          </div>

          <textarea
            className="w-full rounded border p-3"
            placeholder="Notes"
            value={form.notes}
            onChange={(e) => setForm((s) => ({ ...s, notes: e.target.value }))}
          />

          <button className="rounded bg-slate-900 px-4 py-2 text-white">
            Create Submission
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
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Submitted</th>
                  <th className="p-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((submission) => (
                  <tr key={submission.id} className="border-t">
                    <td className="p-3">{submission.job?.title || "-"}</td>
                    <td className="p-3">
                      {submission.candidate
                        ? [submission.candidate.first_name, submission.candidate.last_name]
                            .filter(Boolean)
                            .join(" ")
                        : "-"}
                    </td>
                    <td className="p-3">{submission.status}</td>
                    <td className="p-3">
                      {new Date(submission.submitted_at).toLocaleString()}
                    </td>
                    <td className="p-3">
                      <select
                        className="rounded border px-2 py-1"
                        value={submission.status}
                        onChange={(e) =>
                          handleStatusChange(submission.id, e.target.value)
                        }
                      >
                        <option value="submitted">submitted</option>
                        <option value="review">review</option>
                        <option value="interview">interview</option>
                        <option value="offered">offered</option>
                        <option value="placed">placed</option>
                        <option value="rejected">rejected</option>
                      </select>
                    </td>
                  </tr>
                ))}
                {!submissions.length ? (
                  <tr>
                    <td colSpan="5" className="p-6 text-center text-slate-500">
                      No submissions yet.
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