import { useContext } from "react";
import { FiBell, FiLogOut, FiSearch } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/auth-context";

const Topbar = () => {
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-6">
      <div>
        <p className="text-sm font-medium text-slate-500">Today</p>
        <h2 className="text-xl font-semibold text-slate-950">
          Service Desk Overview
        </h2>
      </div>

      <div className="flex items-center gap-5">
        <div className="hidden items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 transition hover:border-cyan-200 hover:bg-cyan-50 lg:flex">
          <FiSearch className="text-slate-400" />
          <span className="text-sm text-slate-500">Search tickets</span>
        </div>

        <button className="relative rounded-lg border border-slate-200 p-3 text-slate-600 transition hover:-translate-y-0.5 hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700 hover:shadow-md">
          <FiBell size={18} />
          <span className="blink-alert absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-rose-500 shadow shadow-rose-300" />
        </button>

        <Link to="/profile" className="flex items-center gap-3">
          {user?.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt=""
              className="h-10 w-10 rounded-lg object-cover"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-100 font-bold text-cyan-800 transition hover:scale-105">
              {(user?.name || "S").charAt(0)}
            </div>
          )}

          <div>
            <p className="font-medium">{user?.name || "Service Desk User"}</p>

            <p className="text-sm text-gray-500">
              {user?.role || "Service Desk Agent"}
            </p>
          </div>
        </Link>

        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:-translate-y-0.5 hover:bg-slate-100 hover:shadow-sm"
        >
          <FiLogOut />
          Logout
        </button>
      </div>
    </header>
  );
};

export default Topbar;
