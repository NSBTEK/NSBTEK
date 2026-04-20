import { useEffect, useState } from "react";
import AppShell from "@/components/layout/AppShell";
import { useAuth } from "@/contexts/AuthContext";
import { createCandidate, listCandidates } from "@/services/ats/candidates";

const emptyForm = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  current_location: "",
  current_company: "",
  current_title: "",
  source: "",
  status: "active",
  resume_url: "",
  notes: "",
};

export default function CandidatesPage() {
  const { authUser } = useAuth();
  const [candidates, setCandidates] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);

  async function loadCandidates() {
    if (!authUser) return;
    setLoading(true);
    try {
      const data = await listCandidates(authUser);
      setCandidates(data);
    } catch (error) {
      console.error(error);
      alert(error.message || "Failed to load candidates");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCandidates();
  }, [authUser]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await createCandidate(authUser, form);
      setForm(emptyForm);
      await loadCandidates();
    } catch (error) {
      console.error(error);
      alert(error.message || "Failed to create candidate");
    }
  }

  return (
    <AppShell>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Candidates</h1>

        <form onSubmit={handleSubmit} className="rounded-xl border bg-white p-4 space-y-3">
          <div className="grid gap-3 md:grid-cols-2">
            <input
              className="w-full rounded border p-3"
              placeholder="First name"
              value={form.first_name}
              onChange={(e) => setForm((s) => ({ ...s, first_name: e.target.value }))}
              required
            />
            <input
              className="w-full rounded border p-3"
              placeholder="Last name"
              value={form.last_name}
              onChange={(e) => setForm((s) => ({ ...s, last_name: e.target.value }))}
            />
            <input
              className="w-full rounded border p-3"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
            />
            <input
              className="w-full rounded border p-3"
              placeholder="Phone"
              value={form.phone}
              onChange={(e) => setForm((s) => ({ ...s, phone: e.target.value }))}
            />
            <input
              className="w-full rounded border p-3"
              placeholder="Current location"
              value={form.current_location}
              onChange={(e) => setForm((s) => ({ ...s, current_location: e.target.value }))}
            />
            <input
              className="w-full rounded border p-3"
              placeholder="Current company"
              value={form.current_company}
              onChange={(e) => setForm((s) => ({ ...s, current_company: e.target.value }))}
            />
            <input
              className="w-full rounded border p-3"
              placeholder="Current title"
              value={form.current_title}
              onChange={(e) => setForm((s) => ({ ...s, current_title: e.target.value }))}
            />
            <input
              className="w-full rounded border p-3"
              placeholder="Source"
              value={form.source}
              onChange={(e) => setForm((s) => ({ ...s, source: e.target.value }))}
            />
          </div>

          <textarea
            className="w-full rounded border p-3"
            placeholder="Notes"
            value={form.notes}
            onChange={(e) => setForm((s) => ({ ...s, notes: e.target.value }))}
          />

          <button className="rounded bg-slate-900 px-4 py-2 text-white">
            Create Candidate
          </button>
        </form>

        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="overflow-hidden rounded-xl border bg-white">
            <table className="w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Phone</th>
                  <th className="p-3 text-left">Company</th>
                  <th className="p-3 text-left">Title</th>
                </tr>
              </thead>
              <tbody>
                {candidates.map((candidate) => (
                  <tr key={candidate.id} className="border-t">
                    <td className="p-3">
                      {[candidate.first_name, candidate.last_name].filter(Boolean).join(" ")}
                    </td>
                    <td className="p-3">{candidate.email || "-"}</td>
                    <td className="p-3">{candidate.phone || "-"}</td>
                    <td className="p-3">{candidate.current_company || "-"}</td>
                    <td className="p-3">{candidate.current_title || "-"}</td>
                  </tr>
                ))}
                {!candidates.length ? (
                  <tr>
                    <td colSpan="5" className="p-6 text-center text-slate-500">
                      No candidates yet.
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