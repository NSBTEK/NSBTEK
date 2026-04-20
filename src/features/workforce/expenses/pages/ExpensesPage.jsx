import { useEffect, useState } from "react";
import AppShell from "@/components/layout/AppShell";
import { useAuth } from "@/contexts/AuthContext";
import { listPlacements } from "@/services/ats/placements";
import { createExpense, listExpenses } from "@/services/workforce/expenses";

const emptyForm = {
  placement_id: "",
  expense_date: "",
  category: "travel",
  amount: "",
  currency_code: "USD",
  status: "submitted",
  description: "",
  receipt_url: "",
};

export default function ExpensesPage() {
  const { authUser } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [placements, setPlacements] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);

  async function loadPage() {
    if (!authUser) return;
    setLoading(true);
    try {
      const [expensesData, placementsData] = await Promise.all([
        listExpenses(authUser),
        listPlacements(authUser),
      ]);
      setExpenses(expensesData);
      setPlacements(placementsData);
    } catch (error) {
      console.error(error);
      alert(error.message || "Failed to load expenses");
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
      await createExpense(authUser, form);
      setForm(emptyForm);
      await loadPage();
    } catch (error) {
      console.error(error);
      alert(error.message || "Failed to create expense");
    }
  }

  return (
    <AppShell>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Expenses</h1>

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
              type="date"
              value={form.expense_date}
              onChange={(e) => setForm((s) => ({ ...s, expense_date: e.target.value }))}
              required
            />

            <select
              className="w-full rounded border p-3"
              value={form.category}
              onChange={(e) => setForm((s) => ({ ...s, category: e.target.value }))}
            >
              <option value="travel">travel</option>
              <option value="meals">meals</option>
              <option value="lodging">lodging</option>
              <option value="supplies">supplies</option>
              <option value="other">other</option>
            </select>

            <input
              className="w-full rounded border p-3"
              type="number"
              step="0.01"
              placeholder="Amount"
              value={form.amount}
              onChange={(e) => setForm((s) => ({ ...s, amount: e.target.value }))}
              required
            />

            <input
              className="w-full rounded border p-3"
              placeholder="Receipt URL"
              value={form.receipt_url}
              onChange={(e) => setForm((s) => ({ ...s, receipt_url: e.target.value }))}
            />
          </div>

          <textarea
            className="w-full rounded border p-3"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm((s) => ({ ...s, description: e.target.value }))}
          />

          <button className="rounded bg-slate-900 px-4 py-2 text-white">
            Create Expense
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
                  <th className="p-3 text-left">Category</th>
                  <th className="p-3 text-left">Date</th>
                  <th className="p-3 text-left">Amount</th>
                  <th className="p-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense) => (
                  <tr key={expense.id} className="border-t">
                    <td className="p-3">
                      {expense.placement?.submission?.candidate
                        ? [
                            expense.placement.submission.candidate.first_name,
                            expense.placement.submission.candidate.last_name,
                          ]
                            .filter(Boolean)
                            .join(" ")
                        : "-"}
                    </td>
                    <td className="p-3">{expense.category}</td>
                    <td className="p-3">{expense.expense_date}</td>
                    <td className="p-3">{expense.amount} {expense.currency_code}</td>
                    <td className="p-3">{expense.status}</td>
                  </tr>
                ))}
                {!expenses.length ? (
                  <tr>
                    <td colSpan="5" className="p-6 text-center text-slate-500">
                      No expenses yet.
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