import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Admin Sign In — SnowSea & ShoFirm" }] }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError(null);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/admin` } });
        if (error) throw error;
      }
      navigate({ to: "/admin" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed");
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen grid place-items-center p-6 bg-navy text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.76_0.15_78/0.2),transparent_60%)] pointer-events-none" />
      <form onSubmit={submit} className="relative w-full max-w-md p-8 lg:p-10 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
        <div className="text-center mb-8">
          <div className="font-display font-extrabold text-2xl">Admin Portal</div>
          <div className="text-sm text-white/60 mt-1">Manage orders for SnowSea & ShoFirm Foods</div>
        </div>
        <div className="space-y-4">
          <label className="block">
            <div className="text-xs uppercase tracking-wider text-white/60 mb-1.5">Email</div>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required className="w-full h-12 px-4 rounded-xl bg-white/10 border border-white/15 focus:border-gold outline-none" />
          </label>
          <label className="block">
            <div className="text-xs uppercase tracking-wider text-white/60 mb-1.5">Password</div>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required minLength={6} className="w-full h-12 px-4 rounded-xl bg-white/10 border border-white/15 focus:border-gold outline-none" />
          </label>
        </div>
        {error && <div className="mt-4 text-sm text-red-300">{error}</div>}
        <button disabled={loading} type="submit" className="mt-6 w-full h-12 rounded-full bg-gold text-navy font-medium inline-flex items-center justify-center gap-2 disabled:opacity-60">
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {mode === "signin" ? "Sign in" : "Create admin account"}
        </button>
        <button type="button" onClick={() => setMode(mode === "signin" ? "signup" : "signin")} className="mt-4 w-full text-sm text-white/60 hover:text-gold">
          {mode === "signin" ? "First time? Create the admin account" : "Already have an account? Sign in"}
        </button>
        <div className="mt-6 text-xs text-white/40 text-center">The first account created becomes the admin.</div>
      </form>
    </div>
  );
}