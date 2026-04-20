import { useEffect, useState } from "react";
import AppShell from "@/components/layout/AppShell";
import { useAuth } from "@/contexts/AuthContext";
import { listPlacements } from "@/services/ats/placements";
import { createContract, listContracts } from "@/services/workforce/contracts";

const emptyForm = {
  placement_id: "",
  contract_number: "",
  start_date: "",
  end_date: "",
  status: "draft",
  document_url: "",
  notes: "",
};

export default function ContractsPage() {
  const { authUser } = useAuth();
  const [contracts, setContracts] = useState([]);
  const [placements, setPlacements] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);

  async function loadPage() {
    if (!authUser) return;
    setLoading(true);
    try {
      const [contractsData, placementsData] = await Promise.all([
        listContracts(authUser),
        listPlacements(authUser),
      ]);
      setContracts(contractsData);
      setPlacements(placementsData);
    } catch (error) {
      console.error(error);
      alert(error.message || "Failed to load contracts");
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
      await createContract(authUser, form);
      setForm(emptyForm);
      await loadPage();
    } catch (error) {
      console.error(error);
      alert(error.message || "Failed to create contract");
    }
  }

  return (
    <AppShell>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Contracts</h1>

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

            <input
              className="w-full rounded border p-3"
              placeholder="Contract number"
              value={form.contract_number}
              onChange={(e) => setForm((s) => ({ ...s, contract_number: e.target.value }))}
            />

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

            <select
              className="w-full rounded border p-3"
              value={form.status}
              onChange={(e) => setForm((s) => ({ ...s, status: e.target.value }))}
            >
              <option value="draft">draft</option>
              <option value="sent">sent</option>
              <option value="signed">signed</option>
            </select>

            <input
              className="w-full rounded border p-3"
              placeholder="Document URL"
              value={form.document_url}
              onChange={(e) => setForm((s) => ({ ...s, document_url: e.target.value }))}
            />
          </div>

          <textarea
            className="w-full rounded border p-3"
            placeholder="Notes"
            value={form.notes}
            onChange={(e) => setForm((s) => ({ ...s, notes: e.target.value }))}
          />

          <button className="rounded bg-slate-900 px-4 py-2 text-white">
            Create Contract
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
                  <th className="p-3 text-left">Job</th>
                  <th className="p-3 text-left">Contract #</th>
                  <th className="p-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {contracts.map((contract) => (
                  <tr key={contract.id} className="border-t">
                    <td className="p-3">
                      {contract.placement?.submission?.candidate
                        ? [
                            contract.placement.submission.candidate.first_name,
                            contract.placement.submission.candidate.last_name,
                          ]
                            .filter(Boolean)
                            .join(" ")
                        : "-"}
                    </td>
                    <td className="p-3">{contract.placement?.submission?.job?.title || "-"}</td>
                    <td className="p-3">{contract.contract_number || "-"}</td>
                    <td className="p-3">{contract.status}</td>
                  </tr>
                ))}
                {!contracts.length ? (
                  <tr>
                    <td colSpan="4" className="p-6 text-center text-slate-500">
                      No contracts yet.
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