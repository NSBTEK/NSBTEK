import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-xl text-center space-y-4">
        <h1 className="text-4xl font-bold">NSBTEK</h1>
        <p className="text-slate-600">
          Staffing platform for ATS, CRM, and Workforce management.
        </p>
        <Link
          to="/login"
          className="inline-block rounded bg-slate-900 px-4 py-2 text-white"
        >
          Login
        </Link>
      </div>
    </div>
  );
}