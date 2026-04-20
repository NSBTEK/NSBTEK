import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

import LandingPage from "@/pages/LandingPage";
import ForbiddenPage from "@/pages/ForbiddenPage";
import NotFoundPage from "@/pages/NotFoundPage";

import LoginPage from "@/features/auth/pages/LoginPage";
import ResetPasswordPage from "@/features/auth/pages/ResetPasswordPage";
import DashboardPage from "@/features/dashboard/pages/DashboardPage";

import ClientsPage from "@/features/crm/clients/pages/ClientsPage";
import ContactsPage from "@/features/crm/contacts/pages/ContactsPage";
import ActivitiesPage from "@/features/crm/activities/pages/ActivitiesPage";

import JobsPage from "@/features/ats/jobs/pages/JobsPage";
import CandidatesPage from "@/features/ats/candidates/pages/CandidatesPage";
import SubmissionsPage from "@/features/ats/submissions/pages/SubmissionsPage";
import InterviewsPage from "@/features/ats/interviews/pages/InterviewsPage";
import PlacementsPage from "@/features/ats/placements/pages/PlacementsPage";

import ContractsPage from "@/features/workforce/contracts/pages/ContractsPage";
import OnboardingPage from "@/features/workforce/onboarding/pages/OnboardingPage";
import TimesheetsPage from "@/features/workforce/timesheets/pages/TimesheetsPage";
import ExpensesPage from "@/features/workforce/expenses/pages/ExpensesPage";
import PayrollPage from "@/features/workforce/payroll/pages/PayrollPage";

import UserManagementPage from "@/features/admin/users/pages/UserManagementPage";
import RoleGroupsPage from "@/features/admin/role-groups/pages/RoleGroupsPage";
import SettingsPage from "@/features/admin/settings/pages/SettingsPage";

const BASENAME = import.meta.env.BASE_URL || "/";

export default function AppRouter() {
  return (
    <BrowserRouter basename={BASENAME}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/forbidden" element={<ForbiddenPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />

          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/activities" element={<ActivitiesPage />} />

          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/candidates" element={<CandidatesPage />} />
          <Route path="/submissions" element={<SubmissionsPage />} />
          <Route path="/interviews" element={<InterviewsPage />} />
          <Route path="/placements" element={<PlacementsPage />} />

          <Route path="/contracts" element={<ContractsPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/timesheets" element={<TimesheetsPage />} />
          <Route path="/expenses" element={<ExpensesPage />} />
          <Route path="/payroll" element={<PayrollPage />} />

          <Route path="/admin/users" element={<UserManagementPage />} />
          <Route path="/admin/role-groups" element={<RoleGroupsPage />} />
          <Route path="/admin/settings" element={<SettingsPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}