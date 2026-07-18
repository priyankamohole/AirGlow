import { useNavigate } from "react-router-dom";

export default function Topbar({ title }) {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-20 bg-white border-b shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left */}
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
          <p className="text-sm text-gray-500">Welcome back 👋</p>
        </div>

        {/* Right */}
        <div className="flex items-center gap-5">
          {/* Notification */}
          <button className="relative p-2 rounded-full hover:bg-gray-100 transition">
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              viewBox="0 0 24 24"
            >
              <path d="M6 9a6 6 0 1 1 12 0c0 5 2 6 2 6H4s2-1 2-6Z" />
              <path d="M10 20a2 2 0 0 0 4 0" />
            </svg>

            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User */}
          <button
            onClick={() => navigate("/app/settings")}
            className="flex items-center gap-3 hover:bg-gray-100 rounded-full p-2 transition"
          >
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
              AD
            </div>

            <div className="hidden md:block text-left">
              <p className="font-semibold text-gray-700">Admin User</p>

              <p className="text-xs text-gray-500">admin@airglow.com</p>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
