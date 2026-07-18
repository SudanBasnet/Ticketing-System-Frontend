import { useContext, useState } from "react";
import { FiArrowRight, FiLock, FiMail } from "react-icons/fi";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import AuthShell from "./AuthShell";
import { AuthContext } from "../context/auth-context";
import Spinner from "../components/UI/Spinner";
import { delay } from "../utils/delay";

const Login = () => {
  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState(developmentAccounts[0]);
  const [error, setError] = useState("");
  const [showCatAlert, setShowCatAlert] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const redirectTo = location.state?.from?.pathname || "/app";

  const playFailedLoginSound = () => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;

    if (!AudioContext) {
      return;
    }

    const audioContext = new AudioContext();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    const noiseBuffer = audioContext.createBuffer(
      1,
      audioContext.sampleRate * 0.08,
      audioContext.sampleRate,
    );
    const output = noiseBuffer.getChannelData(0);

    for (let index = 0; index < output.length; index += 1) {
      output[index] = (Math.random() * 2 - 1) * (1 - index / output.length);
    }

    const noise = audioContext.createBufferSource();
    noise.buffer = noiseBuffer;

    oscillator.type = "square";
    oscillator.frequency.setValueAtTime(140, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(
      55,
      audioContext.currentTime + 0.12,
    );

    gainNode.gain.setValueAtTime(0.001, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.18,
      audioContext.currentTime + 0.01,
    );
    gainNode.gain.exponentialRampToValueAtTime(
      0.001,
      audioContext.currentTime + 0.16,
    );

    oscillator.connect(gainNode);
    noise.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();
    noise.start();
    oscillator.stop(audioContext.currentTime + 0.16);
    noise.stop(audioContext.currentTime + 0.08);
  };

  if (user) {
    return <Navigate to="/app" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    const [result] = await Promise.all([login(formData), delay(2000)]);

    if (!result.ok) {
      setError(result.message);
      setFailedAttempts((attempts) => attempts + 1);
      setShowCatAlert(true);
      playFailedLoginSound();
      toast.error("Login failed. Check your email and password.");

      window.setTimeout(() => {
        setShowCatAlert(false);
      }, 2600);
      setIsSubmitting(false);

      return;
    }

    toast.success("Welcome back to the service desk.");
    navigate(redirectTo, { replace: true });
  };

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to continue managing your service desk queue, SLA alerts, and ticket handoffs."
    >
      <div className="relative">
        {showCatAlert && (
          <div className="cat-pop absolute left-1/2 top-[-96px] z-20 w-64 rounded-lg border border-rose-200 bg-white p-4 text-center shadow-2xl shadow-rose-200">
            <div className="mx-auto flex h-16 w-20 items-center justify-center rounded-full bg-amber-100 text-4xl">
              🐱
            </div>
            <p className="mt-2 font-bold text-slate-950">Login missed!</p>
            <p className="text-sm text-slate-500">
              The desk cat bonked the alarm.
            </p>
          </div>
        )}

        <div className={showCatAlert ? "shake-card" : ""}>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <p className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                {error} Failed attempts: {failedAttempts + 1}
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
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full bg-transparent py-3 outline-none"
                  required
                />
              </div>
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-950 p-3 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-cyan-700 hover:shadow-lg disabled:cursor-wait disabled:opacity-70"
            >
              {isSubmitting ? (
                <Spinner size="sm" label="Signing in..." />
              ) : (
                <>
                  Login <FiArrowRight />
                </>
              )}
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-slate-600">
            Need an account?{" "}
            <Link to="/register" className="font-semibold text-cyan-700">
              Register
            </Link>
          </p>
          <p className="mt-2 text-center text-sm text-slate-600">
            <Link to="/forgot-password" className="font-semibold text-cyan-700">
              Forgot password?
            </Link>
          </p>
        </div>
      </div>
    </AuthShell>
  );
};

export default Login;
