import { useEffect, useState } from "react";
import AppShell from "@/components/layout/AppShell";
import { useAuth } from "@/contexts/AuthContext";
import {
  getOrganizationSettings,
  updateOrganizationSettings,
} from "@/services/core/settings";

export default function SettingsPage() {
  const { authUser } = useAuth();
  const [form, setForm] = useState({
    app_name: "",
    primary_color: "#0f172a",
    timezone: "America/New_York",
    currency_code: "USD",
    date_format: "MM/dd/yyyy",
  });
  const [loading, setLoading] = useState(true);

  async function loadSettings() {
    if (!authUser) return;
    setLoading(true);
    try {
      const data = await getOrganizationSettings(authUser);
      setForm({
        app_name: data.app_name || "",
        primary_color: data.primary_color || "#0f172a",
        timezone: data.timezone || "America/New_York",
        currency_code: data.currency_code || "USD",
        date_format: data.date_format || "MM/dd/yyyy",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSettings();
  }, [authUser]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await updateOrganizationSettings(authUser, form);
      alert("Settings saved");
    } catch (error) {
      console.error(error);
      alert(error.message || "Failed to save settings");
    }
  }

  if (loading) {
    return (
      <AppShell>
        <div>Loading...</div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Settings</h1>

        <form
          onSubmit={handleSubmit}
          className="rounded-xl border bg-white p-4 space-y-4 max-w-2xl"
        >
          <input
            className="w-full rounded border p-3"
            placeholder="App Name"
            value={form.app_name}
            onChange={(e) => setForm((s) => ({ ...s, app_name: e.target.value }))}
          />

          <input
            className="w-full rounded border p-3"
            placeholder="Primary Color"
            value={form.primary_color}
            onChange={(e) =>
              setForm((s) => ({ ...s, primary_color: e.target.value }))
            }
          />

          <input
            className="w-full rounded border p-3"
            placeholder="Timezone"
            value={form.timezone}
            onChange={(e) => setForm((s) => ({ ...s, timezone: e.target.value }))}
          />

          <input
            className="w-full rounded border p-3"
            placeholder="Currency Code"
            value={form.currency_code}
            onChange={(e) =>
              setForm((s) => ({ ...s, currency_code: e.target.value }))
            }
          />

          <input
            className="w-full rounded border p-3"
            placeholder="Date Format"
            value={form.date_format}
            onChange={(e) =>
              setForm((s) => ({ ...s, date_format: e.target.value }))
            }
          />

          <button className="rounded bg-slate-900 px-4 py-2 text-white">
            Save Settings
          </button>
        </form>
      </div>
    </AppShell>
  );
}