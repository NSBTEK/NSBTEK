import AppShell from "@/components/layout/AppShell";

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-slate-600">
          Welcome to NSBTEK.
        </p>
      </div>
    </AppShell>
  );
}