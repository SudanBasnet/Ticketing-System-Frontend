import { useContext, useState } from "react";
import { FiCheckCircle, FiKey, FiRefreshCw } from "react-icons/fi";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import AuthShell from "./AuthShell";
import { AuthContext } from "../context/auth-context";
import { apiMessage } from "../services/api";
import { resendVerification, verifyEmail } from "../services/auth";
import Spinner from "../components/UI/Spinner";

const VerifyEmail = () => {
  const { user } = useContext(AuthContext);
  const [token, setToken] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleVerify = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await verifyEmail(token);
      toast.success("Email verified.");
    } catch (error) {
      toast.error(apiMessage(error, "Could not verify email."));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    try {
      await resendVerification();
      toast.success("Verification token sent.");
    } catch (error) {
      toast.error(apiMessage(error, "Could not resend verification."));
    }
  };

  return (
    <AuthShell
      title="Verify your email"
      subtitle="Use the verification token from your email or development logs."
    >
      <form onSubmit={handleVerify} className="space-y-4">
        {user?.email && (
          <p className="rounded-lg border border-cyan-100 bg-cyan-50 p-3 text-sm text-cyan-900">
            Signed in as {user.email}
          </p>
        )}

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">
            Verification token
          </span>
          <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3 transition focus-within:border-cyan-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-cyan-100">
            <FiKey className="text-slate-400" />
            <input
              value={token}
              onChange={(event) => setToken(event.target.value)}
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
          {isSubmitting ? <Spinner size="sm" label="Verifying..." /> : <><FiCheckCircle /> Verify email</>}
        </button>
      </form>

      <button
        type="button"
        onClick={handleResend}
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 p-3 font-semibold text-slate-700 transition hover:bg-slate-50"
      >
        <FiRefreshCw />
        Resend token
      </button>

      <p className="mt-4 text-center text-sm text-slate-600">
        <Link to="/" className="font-semibold text-cyan-700">
          Return to workspace
        </Link>
      </p>
    </AuthShell>
  );
};

export default VerifyEmail;
