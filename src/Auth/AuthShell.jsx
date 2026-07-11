import { FiActivity, FiCheckCircle, FiShield, FiZap } from "react-icons/fi";
import { Link } from "react-router-dom";
import ThemeToggle from "../components/UI/ThemeToggle";

const highlights = [
  {
    icon: <FiShield />,
    label: "Secure workspace",
    value: "Role-aware access",
  },
  {
    icon: <FiActivity />,
    label: "Live service desk",
    value: "245 active tickets",
  },
  {
    icon: <FiZap />,
    label: "SLA focus",
    value: "92% on track",
  },
];

const AuthShell = ({ children, title, subtitle }) => {
  return (
    <main className="auth-shell min-h-screen bg-base-200 text-base-content transition-colors duration-300">
      <nav className="flex h-20 items-center justify-between border-b border-base-300 bg-base-100 px-5 sm:px-8 lg:px-12">
        <Link to="/" className="flex items-center gap-3 font-bold text-base-content">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400">
            <FiCheckCircle size={21} />
          </span>
          <span className="text-xl">ClearQueue</span>
        </Link>
        <div className="hidden items-center gap-7 text-sm font-medium text-slate-600 md:flex">
          <Link to="/#product">Product</Link>
          <Link to="/#features">Features</Link>
          <Link to="/#insights">Insights</Link>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link to="/login" className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700">Sign in</Link>
          <Link to="/register" className="rounded-lg bg-slate-950 px-4 py-2 text-sm font-semibold text-white">Start free</Link>
        </div>
      </nav>
      <div className="grid min-h-[calc(100vh-5rem)] lg:grid-cols-[1.05fr_0.95fr]">
        <section className="relative hidden overflow-hidden bg-slate-950 px-12 py-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(#ffffff18_1px,transparent_1px),linear-gradient(90deg,#ffffff18_1px,transparent_1px)] [background-size:42px_42px]" />

          <div className="relative">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-cyan-400 text-slate-950">
                <FiCheckCircle size={22} />
              </div>
              <div>
                <p className="text-lg font-bold">ITSM Portal</p>
                <p className="text-sm text-slate-300">Ticketing System</p>
              </div>
            </div>

            <div className="mt-20 max-w-xl">
              <p className="mb-4 text-sm font-semibold uppercase text-cyan-300">
                Service operations
              </p>
              <h1 className="text-5xl font-bold leading-tight">
                Keep incidents, requests, and SLAs moving in one calm workspace.
              </h1>
              <p className="mt-5 max-w-lg text-base leading-7 text-slate-300">
                Triage tickets, review priorities, and stay close to every
                service desk handoff from a focused operational dashboard.
              </p>
            </div>
          </div>

          <div className="relative grid gap-4">
            {highlights.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-4 rounded-lg border border-white/10 bg-white/10 p-4 backdrop-blur"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/15 text-cyan-200">
                  {item.icon}
                </div>
                <div>
                  <p className="text-sm text-slate-300">{item.label}</p>
                  <p className="font-semibold text-white">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="flex min-h-[calc(100vh-5rem)] items-center justify-center px-5 py-10 sm:px-8">
          <div className="w-full max-w-md">
            <div className="mb-8 lg:hidden">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-slate-950 text-cyan-300">
                  <FiCheckCircle size={22} />
                </div>
                <div>
                  <p className="text-lg font-bold">ITSM Portal</p>
                  <p className="text-sm text-slate-500">Ticketing System</p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h1 className="text-3xl font-bold tracking-normal">{title}</h1>
              <p className="mt-2 text-slate-600">{subtitle}</p>
            </div>

            <div className="rounded-lg border border-base-300 bg-base-100 p-6 shadow-xl">
              {children}
            </div>
          </div>
        </section>
      </div>
      <footer className="border-t border-white/10 bg-slate-950 px-5 py-10 text-white sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-7 md:flex-row md:items-end md:justify-between">
          <div>
            <Link to="/" className="flex items-center gap-3 font-bold">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-400 text-slate-950">
                <FiCheckCircle size={19} />
              </span>
              ClearQueue
            </Link>
            <p className="mt-3 max-w-sm text-sm leading-6 text-slate-400">
              Modern incident management for teams that care about the customer experience.
            </p>
          </div>
          <div className="flex flex-wrap gap-6 text-sm text-slate-400">
            <Link to="/#product">Product</Link>
            <Link to="/#features">Features</Link>
            <Link to="/#insights">Insights</Link>
            <Link to="/login">Sign in</Link>
          </div>
        </div>
        <div className="mx-auto mt-8 max-w-7xl border-t border-white/10 pt-5 text-xs text-slate-500">
          © 2026 ClearQueue. Built for better service.
        </div>
      </footer>
    </main>
  );
};

export default AuthShell;
