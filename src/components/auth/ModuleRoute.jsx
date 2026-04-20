import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { canView } from "@/lib/permissions";

export default function ModuleRoute({ moduleKey }) {
  const { profile, loading } = useAuth();

  if (loading) return <div className="p-6">Loading...</div>;

  if (!profile || !canView(profile, moduleKey)) {
    return <Navigate to="/forbidden" replace />;
  }

  return <Outlet />;
}