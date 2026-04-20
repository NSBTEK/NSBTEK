import { supabase } from "@/lib/supabase/browserClient";
import { getProfileOrThrow } from "@/lib/tenant/profile";
import { writeAuditLog } from "@/services/core/auditLogs";

export async function listTimesheets(currentUser) {
  const profile = await getProfileOrThrow(currentUser.id);

  const { data, error } = await supabase
    .from("timesheets")
    .select(`
      *,
      placement:placement_id (
        id,
        submission:submission_id (
          id,
          job:job_id (id, title),
          candidate:candidate_id (id, first_name, last_name)
        )
      ),
      timesheet_entries (*)
    `)
    .eq("organization_id", profile.organization_id)
    .order("week_start_date", { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function createTimesheet(currentUser, payload) {
  const profile = await getProfileOrThrow(currentUser.id);

  const entries = payload.entries || [];
  const totalHours = entries.reduce((sum, row) => sum + Number(row.hours || 0), 0);

  const { data: timesheet, error } = await supabase
    .from("timesheets")
    .insert({
      organization_id: profile.organization_id,
      placement_id: payload.placement_id,
      employee_id: payload.employee_id || currentUser.id,
      week_start_date: payload.week_start_date,
      week_end_date: payload.week_end_date,
      total_hours: totalHours,
      status: payload.status || "draft",
      submitted_at: payload.status === "submitted" ? new Date().toISOString() : null,
      notes: payload.notes || null,
      created_by: currentUser.id,
      updated_by: currentUser.id,
    })
    .select()
    .single();

  if (error) throw error;

  if (entries.length) {
    const rows = entries.map((entry) => ({
      timesheet_id: timesheet.id,
      work_date: entry.work_date,
      hours: Number(entry.hours || 0),
      notes: entry.notes || null,
    }));

    const { error: entriesError } = await supabase
      .from("timesheet_entries")
      .insert(rows);

    if (entriesError) throw entriesError;
  }

  await writeAuditLog(currentUser, {
    module: "timesheets",
    action: "create",
    entityType: "timesheet",
    entityId: timesheet.id,
    metadata: { total_hours: totalHours },
  });

  return timesheet;
}