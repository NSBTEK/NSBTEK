import { supabase } from "@/lib/supabase/browserClient";
import { getProfileOrThrow } from "@/lib/tenant/profile";
import { writeAuditLog } from "@/services/core/auditLogs";

export async function listPayrollRuns(currentUser) {
  const profile = await getProfileOrThrow(currentUser.id);

  const { data, error } = await supabase
    .from("payroll_runs")
    .select(`
      *,
      payroll_run_items (
        *
      )
    `)
    .eq("organization_id", profile.organization_id)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function createPayrollRun(currentUser, payload) {
  const profile = await getProfileOrThrow(currentUser.id);

  const totalGross = (payload.items || []).reduce(
    (sum, item) => sum + Number(item.gross_pay || 0),
    0
  );

  const { data: run, error } = await supabase
    .from("payroll_runs")
    .insert({
      organization_id: profile.organization_id,
      period_start: payload.period_start,
      period_end: payload.period_end,
      status: payload.status || "draft",
      total_gross_pay: totalGross,
      notes: payload.notes || null,
      created_by: currentUser.id,
      updated_by: currentUser.id,
    })
    .select()
    .single();

  if (error) throw error;

  if (payload.items?.length) {
    const rows = payload.items.map((item) => ({
      payroll_run_id: run.id,
      placement_id: item.placement_id,
      employee_id: item.employee_id || null,
      regular_hours: Number(item.regular_hours || 0),
      overtime_hours: Number(item.overtime_hours || 0),
      gross_pay: Number(item.gross_pay || 0),
      notes: item.notes || null,
    }));

    const { error: itemsError } = await supabase
      .from("payroll_run_items")
      .insert(rows);

    if (itemsError) throw itemsError;
  }

  await writeAuditLog(currentUser, {
    module: "payroll",
    action: "create",
    entityType: "payroll_run",
    entityId: run.id,
    metadata: { total_gross_pay: totalGross },
  });

  return run;
}