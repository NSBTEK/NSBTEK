import { useEffect, useState } from "react";
import AppShell from "@/components/layout/AppShell";
import { useAuth } from "@/contexts/AuthContext";
import { listClients } from "@/services/crm/clients";
import { createJob, listJobs } from "@/services/ats/jobs";

const emptyForm = {
  client_id: "",
  title: "",
  department: "",
  location: "",
  employment_type: "full_time",
  status: "open",
  openings: 1,
  description: "",
  rate_min: "",
  rate_max: "",
};

export default function JobsPage() {
  const { authUser } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);

  async function loadPage() {
    if (!authUser) return;
    setLoading(true);
    try {
      const [jobsData, clientsData] = await Promise.all([
        listJobs(authUser),
        listClients(authUser),
      ]);
      setJobs(jobsData);
      setClients(clientsData);
    } catch (error) {
      console.error(error);
      alert(error.message || "Failed to load jobs");
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
      await createJob(authUser, form);
      setForm(emptyForm);
      await loadPage();
    } catch (error) {
      console.error(error);
      alert(error.message || "Failed to create job");
    }
  }

  return (
    <AppShell>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Jobs</h1>

        <form onSubmit={handleSubmit} className="rounded-xl border bg-white p-4 space-y-3">
          <div className="grid gap-3 md:grid-cols-2">
            <select
              className="w-full rounded border p-3"
              value={form.client_id}
              onChange={(e) => setForm((s) => ({ ...s, client_id: e.target.value }))}
            >
              <option value="">Select client</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
            </select>

            <input
              className="w-full rounded border p-3"
              placeholder="Job title"
              value={form.title}
              onChange={(e) => setForm((s) => ({ ...s, title: e.target.value }))}
              required
            />

            <input
              className="w-full rounded border p-3"
              placeholder="Department"
              value={form.department}
              onChange={(e) => setForm((s) => ({ ...s, department: e.target.value }))}
            />

            <input
              className="w-full rounded border p-3"
              placeholder="Location"
              value={form.location}
              onChange={(e) => setForm((s) => ({ ...s, location: e.target.value }))}
            />

            <select
              className="w-full rounded border p-3"
              value={form.employment_type}
              onChange={(e) => setForm((s) => ({ ...s, employment_type: e.target.value }))}
            >
              <option value="full_time">full_time</option>
              <option value="part_time">part_time</option>
              <option value="contract">contract</option>
              <option value="contract_to_hire">contract_to_hire</option>
            </select>

            <select
              className="w-full rounded border p-3"
              value={form.status}
              onChange={(e) => setForm((s) => ({ ...s, status: e.target.value }))}
            >
              <option value="open">open</option>
              <option value="on_hold">on_hold</option>
              <option value="closed">closed</option>
            </select>

            <input
              className="w-full rounded border p-3"
              type="number"
              placeholder="Openings"
              value={form.openings}
              onChange={(e) => setForm((s) => ({ ...s, openings: e.target.value }))}
            />

            <input
              className="w-full rounded border p-3"
              type="number"
              step="0.01"
              placeholder="Min rate"
              value={form.rate_min}
              onChange={(e) => setForm((s) => ({ ...s, rate_min: e.target.value }))}
            />

            <input
              className="w-full rounded border p-3"
              type="number"
              step="0.01"
              placeholder="Max rate"
              value={form.rate_max}
              onChange={(e) => setForm((s) => ({ ...s, rate_max: e.target.value }))}
            />
          </div>

          <textarea
            className="w-full rounded border p-3"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm((s) => ({ ...s, description: e.target.value }))}
          />

          <button className="rounded bg-slate-900 px-4 py-2 text-white">
            Create Job
          </button>
        </form>

        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="overflow-hidden rounded-xl border bg-white">
            <table className="w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="p-3 text-left">Title</th>
                  <th className="p-3 text-left">Client</th>
                  <th className="p-3 text-left">Location</th>
                  <th className="p-3 text-left">Type</th>
                  <th className="p-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr key={job.id} className="border-t">
                    <td className="p-3">{job.title}</td>
                    <td className="p-3">{job.client?.name || "-"}</td>
                    <td className="p-3">{job.location || "-"}</td>
                    <td className="p-3">{job.employment_type}</td>
                    <td className="p-3">{job.status}</td>
                  </tr>
                ))}
                {!jobs.length ? (
                  <tr>
                    <td colSpan="5" className="p-6 text-center text-slate-500">
                      No jobs yet.
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