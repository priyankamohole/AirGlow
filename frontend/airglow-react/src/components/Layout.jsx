import { Outlet } from "react-router-dom";
import { useState } from "react";

import Sidebar from "./Sidebar";
import Header from "./Header";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Desktop Sidebar */}

      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}

      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setSidebarOpen(false)}
          ></div>

          <div className="fixed left-0 top-0 z-50">
            <Sidebar />
          </div>
        </>
      )}

      {/* Content */}

      <div className="lg:ml-72">
        <Header setSidebarOpen={setSidebarOpen} />

        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
