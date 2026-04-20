import { supabase } from "@/lib/supabase/browserClient";
import { getProfileOrThrow } from "@/lib/tenant/profile";
import { writeAuditLog } from "@/services/core/auditLogs";

export async function listExpenses(currentUser) {
  const profile = await getProfileOrThrow(currentUser.id);

  const { data, error } = await supabase
    .from("expenses")
    .select(`
      *,
      placement:placement_id (
        id,
        submission:submission_id (
          id,
          job:job_id (id, title),
          candidate:candidate_id (id, first_name, last_name)
        )
      )
    `)
    .eq("organization_id", profile.organization_id)
    .order("expense_date", { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function createExpense(currentUser, payload) {
  const profile = await getProfileOrThrow(currentUser.id);

  const { data, error } = await supabase
    .from("expenses")
    .insert({
      organization_id: profile.organization_id,
      placement_id: payload.placement_id,
      employee_id: payload.employee_id || currentUser.id,
      expense_date: payload.expense_date,
      category: payload.category,
      amount: Number(payload.amount),
      currency_code: payload.currency_code || "USD",
      status: payload.status || "submitted",
      description: payload.description || null,
      receipt_url: payload.receipt_url || null,
      created_by: currentUser.id,
      updated_by: currentUser.id,
    })
    .select()
    .single();

  if (error) throw error;

  await writeAuditLog(currentUser, {
    module: "expenses",
    action: "create",
    entityType: "expense",
    entityId: data.id,
    metadata: { amount: data.amount, category: data.category },
  });

  return data;
}