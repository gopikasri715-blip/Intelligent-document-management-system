import { NavLink, useNavigate } from "react-router-dom";

import {
  FaHome,
  FaUpload,
  FaSearch,
  FaFolder,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
      isActive
        ? "bg-purple-600 text-white"
        : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
    }`;

  return (
    <div className="w-64 min-h-screen bg-[#18181B] border-r border-zinc-800 p-6">

      {/* LOGO */}

      <h1 className="text-3xl font-bold text-purple-400 mb-10">
        IDMS
      </h1>

      {/* NAVIGATION */}

      <nav className="space-y-3">

        <NavLink to="/" className={linkClass}>
          <FaHome />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/upload" className={linkClass}>
          <FaUpload />
          <span>Upload</span>
        </NavLink>

        <NavLink to="/search" className={linkClass}>
          <FaSearch />
          <span>Search</span>
        </NavLink>

        <NavLink to="/categories" className={linkClass}>
          <FaFolder />
          <span>Categories</span>
        </NavLink>

        <NavLink to="/reports" className={linkClass}>
          <FaChartBar />
          <span>Reports</span>
        </NavLink>

        <NavLink to="/settings" className={linkClass}>
          <FaCog />
          <span>Settings</span>
        </NavLink>

        {/* LOGOUT */}

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition mt-10 w-full"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>

      </nav>

    </div>
  );
}