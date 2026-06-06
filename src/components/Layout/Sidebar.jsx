import {
  FiHome,
  FiAlertCircle,
  FiPackage,
  FiRefreshCw,
  FiTool,
  FiDatabase,
  FiCheckCircle,
} from "react-icons/fi";

import { NavLink } from "react-router-dom";

const menuItems = [
  {
    name: "Dashboard",
    path: "/",
    icon: <FiHome />,
  },
  {
    name: "Incidents",
    path: "/incidents",
    icon: <FiAlertCircle />,
  },
  {
    name: "Requests",
    path: "/requests",
    icon: <FiPackage />,
  },
  {
    name: "Changes",
    path: "/changes",
    icon: <FiRefreshCw />,
  },
  {
    name: "Problems",
    path: "/problems",
    icon: <FiTool />,
  },
  {
    name: "CMDB",
    path: "/cmdb",
    icon: <FiDatabase />,
  },
];

const Sidebar = () => {
  return (
    <aside className="flex w-72 flex-col bg-slate-950 text-white">
      <div className="border-b border-white/10 p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-cyan-400 text-slate-950">
            <FiCheckCircle size={22} />
          </div>
          <div>
            <h1 className="text-xl font-bold">ITSM Portal</h1>
            <p className="text-sm text-slate-400">Service command center</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `mb-2 flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition duration-200 hover:translate-x-1 ${
                isActive
                  ? "bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-950/20"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="motion-card m-4 rounded-lg border border-white/10 bg-white/10 p-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold">SLA health</p>
          <span className="blink-alert h-2.5 w-2.5 rounded-full bg-emerald-400" />
        </div>
        <p className="mt-1 text-sm text-slate-300">92% of tickets on track</p>
        <div className="mt-3 h-2 rounded-full bg-slate-800">
          <div className="h-2 w-[92%] rounded-full bg-emerald-400" />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
