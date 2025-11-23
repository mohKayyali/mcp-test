"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const velocityData = [
  { label: "Jan", value: 14 },
  { label: "Feb", value: 16 },
  { label: "Mar", value: 18 },
  { label: "Apr", value: 21 },
  { label: "May", value: 24 },
  { label: "Jun", value: 27 },
];

const healthData = [
  { name: "SLA", value: "99.95%" },
  { name: "Deploys this month", value: "42" },
  { name: "Critical bugs", value: "0" },
  { name: "Story points", value: "132" },
  { name: "Automated tests", value: "1,248" },
];

export default function DashboardPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const savedUser =
      typeof window !== "undefined" ? localStorage.getItem("authUser") : null;
    if (!savedUser) {
      router.replace("/");
      return;
    }
    setUsername(savedUser);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("authUser");
    router.replace("/");
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-50">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-16 -top-32 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(74,222,128,0.3),transparent_55%)] blur-2xl" />
        <div className="absolute bottom-10 right-10 h-96 w-96 rounded-full bg-[radial-gradient(circle_at_70%_70%,rgba(59,130,246,0.3),transparent_60%)] blur-2xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(148,163,184,0.12),transparent_50%)]" />
      </div>

      <header className="absolute left-0 right-0 top-0 z-10 flex items-center justify-between px-6 py-5 sm:px-10">
        <div className="flex flex-col">
          <span className="text-xs uppercase tracking-[0.2em] text-emerald-200">Nimbus</span>
          <strong className="text-lg text-white">
            Project Dashboard {username ? `· ${username}` : ""}
          </strong>
        </div>
        <button
          className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:border-emerald-300 hover:text-emerald-100"
          onClick={handleLogout}
        >
          Logout
        </button>
      </header>

      <main className="relative mx-auto flex max-w-6xl flex-col gap-10 px-6 pb-16 pt-24 sm:px-10 lg:pb-24">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-200">
            {username || "Workspace"}
          </p>
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">Delivery overview</h1>
          <p className="max-w-3xl text-slate-200/80">
            Performance snapshots for the admin workspace—velocity, delivery health, and deployment cadence at a glance.
          </p>
        </div>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8 shadow-[0_20px_60px_-35px_rgba(0,0,0,0.85)] backdrop-blur">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.18em] text-slate-200/70">Velocity</p>
                <p className="text-lg font-semibold text-white">Story points by month</p>
              </div>
              <span className="text-xs rounded-full bg-emerald-400/10 px-3 py-1 text-emerald-200">Last 6 months</span>
            </div>
            <div className="flex items-end gap-4">
              {velocityData.map((item) => (
                <div key={item.label} className="flex flex-1 flex-col items-center gap-2">
                  <div
                    className="w-full rounded-full bg-gradient-to-t from-emerald-500 via-emerald-400 to-emerald-200 shadow-[0_10px_30px_-12px_rgba(16,185,129,0.5)]"
                    style={{ height: `${item.value * 4}px` }}
                    aria-label={`${item.label} velocity ${item.value}`}
                  />
                  <span className="text-xs text-slate-300">{item.label}</span>
                  <span className="text-sm font-semibold text-white">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8 shadow-[0_20px_60px_-35px_rgba(0,0,0,0.85)] backdrop-blur">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.18em] text-slate-200/70">Health</p>
                  <p className="text-lg font-semibold text-white">Delivery signals</p>
                </div>
                <span className="text-xs rounded-full bg-blue-400/10 px-3 py-1 text-blue-200">Real-time</span>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {healthData.map((metric) => (
                  <div key={metric.name} className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3">
                    <span className="text-sm text-slate-200">{metric.name}</span>
                    <span className="text-sm font-semibold text-white">{metric.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8 shadow-[0_20px_60px_-35px_rgba(0,0,0,0.85)] backdrop-blur">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.18em] text-slate-200/70">Deployments</p>
                  <p className="text-lg font-semibold text-white">Recent releases</p>
                </div>
                <span className="text-xs rounded-full bg-white/10 px-3 py-1 text-white">Past 10</span>
              </div>
              <ul className="space-y-3 text-sm text-slate-200">
                <li className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3">
                  <span>api@v1.12.3</span>
                  <span className="text-emerald-200">Passed · 3h ago</span>
                </li>
                <li className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3">
                  <span>web@v2.4.0</span>
                  <span className="text-emerald-200">Passed · 9h ago</span>
                </li>
                <li className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3">
                  <span>worker@v0.8.7</span>
                  <span className="text-yellow-200">In progress</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
