"use client";

import Image from "next/image";
import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const router = useRouter();

  useEffect(() => {
    const savedUser =
      typeof window !== "undefined" ? localStorage.getItem("authUser") : null;
    if (savedUser) {
      setLoggedIn(true);
      router.push("/dashboard");
      setCurrentUser(savedUser);
    }
  }, [router]);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "Login failed");
        return;
      }
      setLoggedIn(true);
      setShowLogin(false);
      setCurrentUser(data.user.username);
      localStorage.setItem("authUser", data.user.username);
      router.push("/dashboard");
    } catch (err) {
      setError("Login failed");
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUsername("");
    setPassword("");
    setCurrentUser("");
    localStorage.removeItem("authUser");
    router.push("/");
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-50">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-16 -top-32 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(74,222,128,0.3),transparent_55%)] blur-2xl" />
        <div className="absolute bottom-10 right-10 h-96 w-96 rounded-full bg-[radial-gradient(circle_at_70%_70%,rgba(59,130,246,0.3),transparent_60%)] blur-2xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(148,163,184,0.12),transparent_50%)]" />
      </div>

      <div className="absolute right-6 top-6 flex items-center gap-3 text-sm text-slate-200">
        {loggedIn ? (
          <>
            <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 font-semibold">
              Signed in as {currentUser || "user"}
            </span>
            <button
              className="rounded-full border border-white/20 bg-white/10 px-4 py-2 font-semibold text-white transition hover:border-emerald-300 hover:text-emerald-100"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <button
            className="rounded-full border border-white/20 bg-white/10 px-4 py-2 font-semibold text-white transition hover:border-emerald-300 hover:text-emerald-100"
            onClick={() => setShowLogin(true)}
          >
            Login
          </button>
        )}
      </div>

      {showLogin && !loggedIn && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-slate-950/70 px-4 backdrop-blur">
          <LoginCard
            username={username}
            password={password}
            error={error}
            onUsernameChange={setUsername}
            onPasswordChange={setPassword}
            onSubmit={handleLogin}
            onClose={() => setShowLogin(false)}
          />
        </div>
      )}

      <main className="relative mx-auto flex max-w-6xl flex-col gap-16 px-6 py-16 sm:px-10 lg:py-24">
        <header className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="flex flex-col gap-6">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">
              Tailored software, shipped fast
            </span>
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
                We craft digital products for teams that move quickly.
              </h1>
              <p className="max-w-xl text-lg text-slate-200/80">
                Nimbus Software House partners with founders and enterprises to
                design, build, and launch web and mobile experiences—from idea
                validation to production-ready platforms.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <a
                className="rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-400/30 transition hover:translate-y-0.5 hover:bg-emerald-300"
                href="mailto:hello@nimbus.dev?subject=Project%20Inquiry"
              >
                Start a project
              </a>
              <a
                className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-emerald-300 hover:text-emerald-200"
                href="#services"
              >
                Explore services
              </a>
            </div>
            <div className="grid grid-cols-2 gap-6 rounded-2xl border border-white/5 bg-white/5 p-6 backdrop-blur">
              <Stat label="Projects shipped" value="120+" />
              <Stat label="Avg. launch time" value="6 weeks" />
              <Stat label="Uptime on managed apps" value="99.95%" />
              <Stat label="Client NPS" value="72" />
            </div>
          </div>

          <div className="relative rounded-3xl border border-white/5 bg-white/5 p-8 shadow-[0_25px_70px_-30px_rgba(0,0,0,0.8)] backdrop-blur">
            <div className="absolute -left-10 top-6 h-28 w-28 rounded-3xl border border-emerald-200/30 bg-emerald-200/10 blur-xl" />
            <div className="absolute -right-12 -top-10 h-32 w-32 rounded-full bg-blue-400/10 blur-3xl" />
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400/20 text-emerald-200">
                  <svg
                    aria-hidden
                    viewBox="0 0 24 24"
                    className="h-7 w-7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 7.5 12 12m0 0 5.25 4.5M12 12 6.75 16.5M12 12l5.25-4.5M4.5 6.75h15a.75.75 0 0 1 .75.75v9a.75.75 0 0 1-.75.75h-15a.75.75 0 0 1-.75-.75v-9a.75.75 0 0 1 .75-.75Z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-200/70">
                    Tech stack
                  </p>
                  <p className="text-lg font-semibold">
                    Next.js · React · TypeScript · Cloud-native
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-slate-900/60 p-6">
                <div className="flex items-center gap-3">
                  <Image
                    src="/window.svg"
                    alt="App preview icon"
                    width={36}
                    height={36}
                    className="opacity-90"
                    priority
                  />
                  <div>
                    <p className="text-sm font-semibold text-white">
                      Product launch sprint
                    </p>
                    <p className="text-sm text-slate-200/80">
                      We validate, design, and deploy your first release in six
                      weeks.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm text-slate-200/80">
                  <span className="rounded-lg bg-white/5 px-3 py-2 text-white">
                    User research
                  </span>
                  <span className="rounded-lg bg-white/5 px-3 py-2 text-white">
                    Design systems
                  </span>
                  <span className="rounded-lg bg-white/5 px-3 py-2 text-white">
                    AI copilots
                  </span>
                  <span className="rounded-lg bg-white/5 px-3 py-2 text-white">
                    Performance first
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <section
          id="services"
          className="grid gap-8 rounded-3xl border border-white/5 bg-white/5 p-10 shadow-[0_15px_60px_-40px_rgba(0,0,0,0.9)] backdrop-blur sm:grid-cols-2 lg:grid-cols-3"
        >
          <ServiceCard
            icon="/globe.svg"
            title="Platform engineering"
            copy="Cloud-native backends, observability, and CI/CD pipelines that keep releases stable and measurable."
          />
          <ServiceCard
            icon="/file.svg"
            title="Product design"
            copy="UX research, product strategy, and design systems that scale with your roadmap."
          />
          <ServiceCard
            icon="/window.svg"
            title="Web & mobile builds"
            copy="Modern web, mobile, and AI-driven interfaces built with performance and accessibility in mind."
          />
        </section>

        <section className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-200/70">
              Selected builds
            </p>
            <h2 className="text-3xl font-semibold">
              Recent software we shipped
            </h2>
            <p className="text-slate-200/80">
              From B2B dashboards to consumer experiences, we pair product
              thinking with reliable engineering to launch faster—and keep
              iterating.
            </p>
            <div className="flex flex-wrap gap-3 text-sm">
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-white">
                SaaS dashboards
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-white">
                AI copilots
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-white">
                Fintech & payments
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-white">
                E2E automation
              </span>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <CaseCard
              title="Northwind Ops"
              description="Operations dashboard that cut manual work by 34% with automated workflows."
              badge="B2B SaaS"
            />
            <CaseCard
              title="Aurora Health"
              description="Patient-facing mobile web app with HIPAA-ready architecture and 99.98% uptime."
              badge="Healthcare"
            />
            <CaseCard
              title="Atlas Pay"
              description="Payment orchestration layer with real-time reporting and risk scoring."
              badge="Fintech"
            />
            <CaseCard
              title="Beacon AI"
              description="Embedded AI copilot that answers customer support tickets in natural language."
              badge="AI/ML"
            />
          </div>
        </section>

        <section className="flex flex-col gap-6 rounded-3xl border border-emerald-300/20 bg-emerald-400/10 p-10 text-slate-950 shadow-[0_25px_60px_-45px_rgba(52,211,153,0.7)] backdrop-blur lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-900">
              Let&apos;s build
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-emerald-950">
              Ready for your next release? We can start in days, not months.
            </h3>
            <p className="mt-2 max-w-2xl text-emerald-900/90">
              Bring us the problem statement. We&apos;ll bring the product
              mindset, the engineering muscle, and a launch plan your
              stakeholders trust.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              className="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-emerald-100 transition hover:-translate-y-0.5 hover:bg-slate-900"
              href="mailto:hello@nimbus.dev?subject=Project%20Inquiry"
            >
              Book a call
            </a>
            <a
              className="rounded-full border border-emerald-900/20 px-6 py-3 text-sm font-semibold text-emerald-900 transition hover:border-emerald-900/40"
              href="#services"
            >
              View capabilities
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}

type LoginCardProps = {
  username: string;
  password: string;
  error: string;
  onUsernameChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
};

function LoginCard({
  username,
  password,
  error,
  onUsernameChange,
  onPasswordChange,
  onSubmit,
  onClose,
}: LoginCardProps) {
  return (
    <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-slate-900/90 p-8 shadow-[0_25px_60px_-35px_rgba(0,0,0,0.9)] backdrop-blur">
      <button
        className="absolute right-4 top-4 text-slate-400 transition hover:text-white"
        onClick={onClose}
        aria-label="Close login form"
      >
        ×
      </button>
      <div className="mb-6 space-y-2 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-emerald-200">
          Nimbus Software House
        </p>
        <h1 className="text-2xl font-semibold text-white">Sign in</h1>
      </div>
      <form onSubmit={onSubmit} className="space-y-4">
        <label className="block">
          <input
            value={username}
            onChange={(event) => onUsernameChange(event.target.value)}
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
            onChange={(event) => onPasswordChange(event.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-emerald-300 focus:ring-2 focus:ring-emerald-300/30"
            placeholder=""
            aria-label="Password"
            autoComplete="current-password"
          />
        </label>
        {error && (
          <p className="text-sm font-semibold text-red-300" role="alert">
            {error}
          </p>
        )}
        <button
          type="submit"
          className="flex w-full items-center justify-center rounded-2xl bg-emerald-400 px-4 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-400/30 transition hover:translate-y-0.5 hover:bg-emerald-300"
        >
          Log in
        </button>
        <p className="text-center text-xs text-slate-300">
          Need an account?{" "}
          <a
            className="font-semibold text-emerald-200 underline-offset-4 hover:underline"
            href="/signup"
          >
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <p className="text-2xl font-semibold text-white">{value}</p>
      <p className="text-sm text-slate-200/70">{label}</p>
    </div>
  );
}

function ServiceCard({
  icon,
  title,
  copy,
}: {
  icon: string;
  title: string;
  copy: string;
}) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-slate-900/60 p-6 shadow-[0_12px_30px_-20px_rgba(0,0,0,0.8)] transition hover:-translate-y-1 hover:border-emerald-300/30 hover:shadow-[0_20px_50px_-25px_rgba(16,185,129,0.35)]">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
        <Image src={icon} alt={title} width={28} height={28} />
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-slate-200/80">{copy}</p>
    </div>
  );
}

function CaseCard({
  title,
  description,
  badge,
}: {
  title: string;
  description: string;
  badge: string;
}) {
  return (
    <div className="relative flex flex-col gap-3 overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 p-5 transition hover:-translate-y-1 hover:border-emerald-300/30">
      <div className="absolute -right-8 -top-10 h-24 w-24 rounded-full bg-emerald-300/10 blur-2xl" />
      <span className="w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white">
        {badge}
      </span>
      <h4 className="text-lg font-semibold text-white">{title}</h4>
      <p className="text-sm text-slate-200/80">{description}</p>
    </div>
  );
}
