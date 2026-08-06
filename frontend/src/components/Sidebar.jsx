import { Link } from "react-router-dom";
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
  return (
    <div className="w-64 bg-[#111827] h-screen text-white p-6 fixed">

      <h1 className="text-3xl font-bold text-purple-400 mb-10">
        IDMS
      </h1>

      <nav className="space-y-4">

        <Link className="flex items-center gap-3 hover:text-purple-400" to="/">
          <FaHome /> Dashboard
        </Link>

        <Link className="flex items-center gap-3 hover:text-purple-400" to="/upload">
          <FaUpload /> Upload
        </Link>

        <Link className="flex items-center gap-3 hover:text-purple-400" to="/search">
          <FaSearch /> Search
        </Link>

        <Link className="flex items-center gap-3 hover:text-purple-400" to="/categories">
          <FaFolder /> Categories
        </Link>

        <Link className="flex items-center gap-3 hover:text-purple-400" to="/reports">
          <FaChartBar /> Reports
        </Link>

        <Link className="flex items-center gap-3 hover:text-purple-400" to="/settings">
          <FaCog /> Settings
        </Link>

        <Link className="flex items-center gap-3 text-red-400 mt-12" to="/login">
          <FaSignOutAlt /> Logout
        </Link>

      </nav>

    </div>
  );
}