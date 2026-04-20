import { useAuth } from "@/contexts/AuthContext";

export default function Header() {
  const { profile, logout } = useAuth();

  async function handleLogout() {
    try {
      await logout();
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  return (
    <header className="h-16 border-b bg-white px-6 flex items-center justify-between">
      <div>
        <h1 className="text-lg font-semibold">NSBTEK</h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-sm text-slate-600">
          {profile?.full_name || profile?.email || "User"}
        </div>
        <button
          onClick={handleLogout}
          className="rounded bg-slate-900 px-3 py-2 text-sm text-white"
        >
          Logout
        </button>
      </div>
    </header>
  );
}