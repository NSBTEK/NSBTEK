const rolePermissions = {
  admin: {
    dashboard: "edit",
    jobs: "edit",
    candidates: "edit",
    submissions: "edit",
    interviews: "edit",
    placements: "edit",
    clients: "edit",
    contacts: "edit",
    activities: "edit",
    timesheets: "edit",
    expenses: "edit",
    contracts: "edit",
    onboarding: "edit",
    payroll: "edit",
    users: "edit",
    columns: "edit",
    integrations: "edit",
    ai_assistant: "edit",
    resume_parser: "edit",
    client_billing: "edit",
    request_access: "edit",
    admin_setup: "edit",
    audit_logs: "edit",
  },
  manager: {
    dashboard: "view",
    jobs: "edit",
    candidates: "edit",
    submissions: "edit",
    interviews: "edit",
    placements: "view",
    clients: "edit",
    contacts: "edit",
    activities: "edit",
    timesheets: "view",
    expenses: "view",
    contracts: "view",
    onboarding: "view",
    payroll: "none",
    users: "view",
    columns: "view",
    integrations: "none",
    ai_assistant: "view",
    resume_parser: "view",
    client_billing: "none",
    request_access: "edit",
    admin_setup: "none",
    audit_logs: "none",
  },
  recruiter: {
    dashboard: "view",
    jobs: "edit",
    candidates: "edit",
    submissions: "edit",
    interviews: "edit",
    placements: "view",
    clients: "view",
    contacts: "view",
    activities: "edit",
    timesheets: "none",
    expenses: "none",
    contracts: "none",
    onboarding: "none",
    payroll: "none",
    users: "none",
    columns: "view",
    integrations: "none",
    ai_assistant: "view",
    resume_parser: "edit",
    client_billing: "none",
    request_access: "view",
    admin_setup: "none",
    audit_logs: "none",
  },
  employee: {
    dashboard: "view",
    jobs: "none",
    candidates: "none",
    submissions: "none",
    interviews: "none",
    placements: "none",
    clients: "none",
    contacts: "none",
    activities: "view_own",
    timesheets: "own",
    expenses: "own",
    contracts: "view_own",
    onboarding: "none",
    payroll: "none",
    users: "none",
    columns: "none",
    integrations: "none",
    ai_assistant: "none",
    resume_parser: "none",
    client_billing: "none",
    request_access: "own",
    admin_setup: "none",
    audit_logs: "none",
  },
};

export function getEffectivePermissions(user) {
  if (!user) return {};
  const roleDefaults = rolePermissions[user.role] || {};
  const roleGroupPermissions = user.role_group_permissions || {};
  const explicitPermissions = user.permissions || {};
  return { ...roleDefaults, ...roleGroupPermissions, ...explicitPermissions };
}

export function getPermissionLevel(user, module) {
  const permissions = getEffectivePermissions(user);
  return permissions[module] || "none";
}

export function canView(user, module) {
  if (!user || user.status === "deactivated") return false;
  if (user.role === "admin") return true;

  if (module === "admin_setup") {
    return canView(user, "users") || canView(user, "columns") || canView(user, "integrations");
  }

  const level = getPermissionLevel(user, module);
  return ["view", "edit", "own", "view_own"].includes(level);
}

export function canEdit(user, module) {
  if (!user || user.status === "deactivated") return false;
  if (user.role === "admin") return true;
  const level = getPermissionLevel(user, module);
  return ["edit", "own"].includes(level);
}

export function isOwnOnly(user, module) {
  const level = getPermissionLevel(user, module);
  return ["own", "view_own"].includes(level);
}

export function canViewAll(user, module) {
  const level = getPermissionLevel(user, module);
  return ["view", "edit"].includes(level);
}