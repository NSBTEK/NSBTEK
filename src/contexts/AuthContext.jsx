import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase/browserClient";
import { getCurrentSession, signOutUser } from "@/lib/auth/session";
import { getProfileOrThrow } from "@/lib/tenant/profile";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  async function refreshAuth() {
    setLoading(true);
    try {
      const session = await getCurrentSession();
      const user = session?.user ?? null;
      setAuthUser(user);

      if (user?.id) {
        const loadedProfile = await getProfileOrThrow(user.id);
        setProfile(loadedProfile);
      } else {
        setProfile(null);
      }
    } catch (error) {
      console.error("Auth refresh failed:", error);
      setAuthUser(null);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refreshAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      refreshAuth();
    });

    return () => subscription.unsubscribe();
  }, []);

  const value = useMemo(
    () => ({
      authUser,
      profile,
      loading,
      refreshAuth,
      logout: signOutUser,
    }),
    [authUser, profile, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}