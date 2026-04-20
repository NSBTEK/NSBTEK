import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function ProtectedRoute() {
  const { authUser, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div className="p-6">Loading...</div>;

  if (!authUser) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}