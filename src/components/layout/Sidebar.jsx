import { NavLink } from "react-router-dom";
import { navigationSections } from "@/config/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { canView } from "@/lib/permissions";

export default function Sidebar() {
  const { profile } = useAuth();

  return (
    <aside className="w-72 border-r bg-white p-4 overflow-y-auto">
      <div className="mb-6">
        <div className="text-lg font-semibold">NSBTEK</div>
        <div className="text-xs text-slate-500 mt-1">
          {profile?.role || "User"}
        </div>
      </div>

      <nav className="space-y-6">
        {navigationSections.map((section) => {
          const visibleItems = section.items.filter((item) =>
            canView(profile, item.moduleKey)
          );

          if (!visibleItems.length) return null;

          return (
            <div key={section.title}>
              <div className="mb-2 px-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                {section.title}
              </div>

              <div className="space-y-1">
                {visibleItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      `block rounded px-3 py-2 text-sm ${
                        isActive
                          ? "bg-slate-900 text-white"
                          : "text-slate-700 hover:bg-slate-100"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}