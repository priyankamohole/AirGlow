import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Workflow,
  PlayCircle,
  CalendarDays,
  Database,
  Webhook,
  Users,
  Settings,
  FileText,
  LogOut,
} from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    path: "/app/dashboard",
    icon: <LayoutDashboard size={20} />,
  },
  {
    name: "DAGs",
    path: "/app/dags",
    icon: <Workflow size={20} />,
  },
  {
    name: "Runs",
    path: "/app/runs",
    icon: <PlayCircle size={20} />,
  },
  {
    name: "Schedules",
    path: "/app/schedules",
    icon: <CalendarDays size={20} />,
  },
  {
    name: "Outputs",
    path: "/app/outputs",
    icon: <Database size={20} />,
  },
  {
    name: "Webhooks",
    path: "/app/webhooks",
    icon: <Webhook size={20} />,
  },
  {
    name: "Users",
    path: "/app/users",
    icon: <Users size={20} />,
  },
  {
    name: "Settings",
    path: "/app/settings",
    icon: <Settings size={20} />,
  },
  {
    name: "Documentation",
    path: "/app/documentation",
    icon: <FileText size={20} />,
  },
];

export default function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-blue-900 text-white flex flex-col shadow-xl">
      {/* Logo */}
      <div className="h-20 flex items-center justify-center border-b border-blue-800">
        <h1 className="text-3xl font-bold tracking-wide">
          Air<span className="text-cyan-300">Glow</span>
        </h1>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <p className="uppercase text-xs text-blue-300 mb-3 font-semibold">
          Navigation
        </p>

        <div className="space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300
                 ${
                   isActive
                     ? "bg-white text-blue-900 shadow-lg font-semibold"
                     : "hover:bg-blue-800"
                 }`
              }
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}
        </div>
      </div>

      {/* User */}
      <div className="border-t border-blue-800 p-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-cyan-400 flex items-center justify-center text-lg font-bold text-blue-900">
            AD
          </div>

          <div>
            <h3 className="font-semibold">Admin User</h3>
            <p className="text-xs text-blue-200">admin@airglow.com</p>
          </div>
        </div>

        <button
          onClick={logout}
          className="mt-5 w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 py-3 rounded-xl transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}
