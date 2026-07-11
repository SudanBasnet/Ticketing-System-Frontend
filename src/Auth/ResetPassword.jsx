import { useState } from "react";
import { FiKey, FiLock } from "react-icons/fi";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

import AuthShell from "./AuthShell";
import { apiMessage } from "../services/api";
import { resetPassword } from "../services/auth";
import Spinner from "../components/UI/Spinner";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    token: searchParams.get("token") || "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await resetPassword(formData);
      toast.success("Password reset. Please log in again.");
      navigate("/login", { replace: true });
    } catch (error) {
      toast.error(apiMessage(error, "Could not reset password."));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthShell
      title="Set a new password"
      subtitle="Open the reset link from your email or paste the token, then choose a new password."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">
            Reset token
          </span>
          <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3 transition focus-within:border-cyan-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-cyan-100">
            <FiKey className="text-slate-400" />
            <input
              value={formData.token}
              onChange={(event) => setFormData({ ...formData, token: event.target.value })}
              className="w-full bg-transparent py-3 outline-none"
              required
            />
          </div>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">
            New password
          </span>
          <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3 transition focus-within:border-cyan-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-cyan-100">
            <FiLock className="text-slate-400" />
            <input
              type="password"
              value={formData.password}
              onChange={(event) => setFormData({ ...formData, password: event.target.value })}
              className="w-full bg-transparent py-3 outline-none"
              minLength={8}
              required
            />
          </div>
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-slate-950 p-3 font-semibold text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? <Spinner size="sm" label="Resetting..." /> : "Reset password"}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-slate-600">
        Remembered it?{" "}
        <Link to="/login" className="font-semibold text-cyan-700">
          Log in
        </Link>
      </p>
    </AuthShell>
  );
};

export default ResetPassword;
