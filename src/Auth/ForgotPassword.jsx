import { useState } from "react";
import { FiArrowLeft, FiMail, FiSend } from "react-icons/fi";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import AuthShell from "./AuthShell";
import { apiMessage } from "../services/api";
import { forgotPassword } from "../services/auth";
import Spinner from "../components/UI/Spinner";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await forgotPassword(email);
      setMessage(response.message);
      toast.success("Password reset request submitted.");
    } catch (error) {
      toast.error(apiMessage(error, "Could not request password reset."));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthShell
      title="Reset your password"
      subtitle="Enter your account email and use the secure reset link sent to your inbox."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {message && (
          <p className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
            {message}
          </p>
        )}

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">
            Email address
          </span>
          <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3 transition focus-within:border-cyan-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-cyan-100">
            <FiMail className="text-slate-400" />
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full bg-transparent py-3 outline-none"
              required
            />
          </div>
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-950 p-3 font-semibold text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? <Spinner size="sm" label="Sending..." /> : <><FiSend /> Send reset token</>}
        </button>
      </form>

      <div className="mt-4 flex justify-between text-sm">
        <Link to="/login" className="flex items-center gap-1 font-semibold text-cyan-700">
          <FiArrowLeft />
          Back to login
        </Link>
        <Link to="/reset-password" className="font-semibold text-cyan-700">
          I have a token
        </Link>
      </div>
    </AuthShell>
  );
};

export default ForgotPassword;
