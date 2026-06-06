import {
  FiHome,
  FiAlertCircle,
  FiPackage,
  FiRefreshCw,
  FiTool,
  FiDatabase,
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
    <aside className="w-64 bg-slate-900 text-white">
      <div className="border-b border-slate-700 p-5">
        <h1 className="text-xl font-bold">ITSM Portal</h1>
      </div>

      <div className="p-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `mb-2 flex items-center gap-3 rounded-lg p-3 ${
                isActive ? "bg-blue-600" : "hover:bg-slate-800"
              }`
            }
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
