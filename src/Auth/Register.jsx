import { useContext, useState } from "react";
import { FiArrowRight, FiLock, FiMail, FiUser } from "react-icons/fi";
import { Link, Navigate, useNavigate } from "react-router-dom";

import AuthShell from "./AuthShell";
import { AuthContext } from "../context/auth-context";

const Register = () => {
  const { register, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = register(formData);

    if (!result.ok) {
      setError(result.message);
      return;
    }

    navigate("/", { replace: true });
  };

  return (
    <AuthShell
      title="Create your workspace account"
      subtitle="Register a service desk profile and start tracking tickets."
    >
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <p className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </p>
          )}

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">
              Full name
            </span>
            <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3 transition focus-within:border-cyan-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-cyan-100">
              <FiUser className="text-slate-400" />
              <input
                type="text"
                placeholder="Sudan Basnet"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full bg-transparent py-3 outline-none"
                required
              />
            </div>
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">
              Email address
            </span>
            <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3 transition focus-within:border-cyan-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-cyan-100">
              <FiMail className="text-slate-400" />
              <input
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full bg-transparent py-3 outline-none"
                required
              />
            </div>
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">
              Password
            </span>
            <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3 transition focus-within:border-cyan-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-cyan-100">
              <FiLock className="text-slate-400" />
              <input
                type="password"
                placeholder="Minimum 6 characters"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full bg-transparent py-3 outline-none"
                required
                minLength={6}
              />
            </div>
          </label>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-950 p-3 font-semibold text-white transition hover:bg-cyan-700"
          >
            Register <FiArrowRight />
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-cyan-700">
            Login
          </Link>
        </p>
    </AuthShell>
  );
};

export default Register;
