"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function SignupPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "Signup failed");
        setLoading(false);
        return;
      }
      localStorage.setItem("authUser", data.user.username);
      router.replace("/dashboard");
    } catch (err) {
      setError("Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-50">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-16 -top-32 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(74,222,128,0.3),transparent_55%)] blur-2xl" />
        <div className="absolute bottom-10 right-10 h-96 w-96 rounded-full bg-[radial-gradient(circle_at_70%_70%,rgba(59,130,246,0.3),transparent_60%)] blur-2xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(148,163,184,0.12),transparent_50%)]" />
      </div>

      <main className="relative mx-auto flex min-h-screen max-w-6xl items-center justify-center px-6 py-16 sm:px-10">
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-900/90 p-8 shadow-[0_25px_60px_-35px_rgba(0,0,0,0.9)] backdrop-blur">
          <div className="mb-6 space-y-2 text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-emerald-200">Nimbus Software House</p>
            <h1 className="text-2xl font-semibold text-white">Create account</h1>
            <p className="text-sm text-slate-200/80">Set a username and password to access the dashboard.</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
              <input
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-emerald-300 focus:ring-2 focus:ring-emerald-300/30"
                placeholder=""
                aria-label="Username"
                autoComplete="username"
              />
            </label>
            <label className="block">
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-emerald-300 focus:ring-2 focus:ring-emerald-300/30"
                placeholder=""
                aria-label="Password"
                autoComplete="new-password"
              />
            </label>
            {error && (
              <p className="text-sm font-semibold text-red-300" role="alert">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center rounded-2xl bg-emerald-400 px-4 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-400/30 transition hover:translate-y-0.5 hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Creating..." : "Sign up"}
            </button>
            <p className="text-center text-xs text-slate-300">
              Already have an account?{" "}
              <a
                className="font-semibold text-emerald-200 underline-offset-4 hover:underline"
                href="/"
              >
                Back to home
              </a>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}
