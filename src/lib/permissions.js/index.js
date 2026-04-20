const roleModules = {
  platform_admin: ["*"],
  company_admin: ["*"],
  manager: [
    "dashboard",
    "clients",
    "contacts",
    "activities",
    "jobs",
    "candidates",
    "submissions",
    "interviews",
    "placements",
    "timesheets",
    "expenses",
    "contracts",
    "onboarding",
    "payroll",
    "admin-users",
    "admin-role-groups",
    "admin-integrations",
  ],
  employee: [
    "dashboard",
    "timesheets",
    "expenses",
    "contracts",
    "onboarding",
  ],
};

export function canView(profile, moduleKey) {
  if (!profile?.role) return false;
  const allowed = roleModules[profile.role] || [];
  return allowed.includes("*") || allowed.includes(moduleKey);
}