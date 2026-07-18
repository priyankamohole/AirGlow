import { Menu, Bell, Search, UserCircle } from "lucide-react";

export default function Header({ setSidebarOpen }) {
  return (
    <header className="h-16 bg-white shadow flex items-center justify-between px-6 sticky top-0 z-30">
      {/* Left */}
      <div className="flex items-center gap-4">
        <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
          <Menu size={24} />
        </button>

        <div className="relative hidden md:block">
          <Search size={18} className="absolute left-3 top-3 text-gray-400" />

          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 border rounded-lg w-72 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Right */}

      <div className="flex items-center gap-6">
        <button className="relative">
          <Bell size={22} />

          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500"></span>
        </button>

        <div className="flex items-center gap-2 cursor-pointer">
          <UserCircle size={34} className="text-blue-700" />

          <div className="hidden md:block">
            <h4 className="font-semibold">Admin</h4>
            <p className="text-xs text-gray-500">admin@airglow.com</p>
          </div>
        </div>
      </div>
    </header>
  );
}
