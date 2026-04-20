export const env = {
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
  supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
  appUrl: import.meta.env.VITE_APP_URL || "http://localhost:5173",
};

if (!env.supabaseUrl || !env.supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}