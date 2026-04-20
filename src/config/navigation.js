export const navigationSections = [
  {
    title: "Core",
    items: [{ to: "/dashboard", label: "Dashboard", moduleKey: "dashboard" }],
  },
  {
    title: "CRM",
    items: [
      { to: "/clients", label: "Clients", moduleKey: "clients" },
      { to: "/contacts", label: "Contacts", moduleKey: "contacts" },
      { to: "/activities", label: "Activities", moduleKey: "activities" },
    ],
  },
  {
    title: "ATS",
    items: [
      { to: "/jobs", label: "Jobs", moduleKey: "jobs" },
      { to: "/candidates", label: "Candidates", moduleKey: "candidates" },
      { to: "/submissions", label: "Submissions", moduleKey: "submissions" },
      { to: "/interviews", label: "Interviews", moduleKey: "interviews" },
      { to: "/placements", label: "Placements", moduleKey: "placements" },
    ],
  },
  {
    title: "Workforce",
    items: [
      { to: "/contracts", label: "Contracts", moduleKey: "contracts" },
      { to: "/onboarding", label: "Onboarding", moduleKey: "onboarding" },
      { to: "/timesheets", label: "Timesheets", moduleKey: "timesheets" },
      { to: "/expenses", label: "Expenses", moduleKey: "expenses" },
      { to: "/payroll", label: "Payroll", moduleKey: "payroll" },
    ],
  },
  {
    title: "Admin",
    items: [
      { to: "/admin/users", label: "User Management", moduleKey: "admin-users" },
      { to: "/admin/role-groups", label: "Role Groups", moduleKey: "admin-role-groups" },
      { to: "/admin/settings", label: "Settings", moduleKey: "admin-settings" },
    ],
  },
];