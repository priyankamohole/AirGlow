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
  Bell,
  Search,
  Menu,
} from "lucide-react";

import { Play, Pencil, MoreVertical } from "lucide-react";

export const LogoIcon = ({ size = 32 }) => (
  <div
    className="flex items-center justify-center rounded-xl bg-blue-600 text-white font-bold"
    style={{
      width: size,
      height: size,
    }}
  >
    A
  </div>
);

export const navIcons = {
  dashboard: <LayoutDashboard size={20} />,
  dags: <Workflow size={20} />,
  runs: <PlayCircle size={20} />,
  schedules: <CalendarDays size={20} />,
  outputs: <Database size={20} />,
  webhooks: <Webhook size={20} />,
  users: <Users size={20} />,
  settings: <Settings size={20} />,
  documentation: <FileText size={20} />,
};

export const topIcons = {
  bell: <Bell size={20} />,
  search: <Search size={20} />,
  menu: <Menu size={20} />,
};

export function IconPlay() {
  return <Play size={16} />;
}

export function IconEdit() {
  return <Pencil size={16} />;
}

export function IconDots() {
  return <MoreVertical size={16} />;
}
