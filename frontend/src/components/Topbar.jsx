import { FaBell, FaSearch, FaUserCircle } from "react-icons/fa";

export default function Topbar() {
  return (
    <div className="h-20 bg-[#18181B] flex items-center justify-between px-8 border-b border-zinc-700">

      <h2 className="text-2xl font-bold">
        Intelligent Document Management System
      </h2>

      <div className="flex items-center gap-5">

        <div className="flex items-center bg-zinc-900 rounded-lg px-4 py-2">

          <FaSearch className="text-zinc-400"/>

          <input
            placeholder="Search..."
            className="bg-transparent ml-3 outline-none"
          />

        </div>

        <FaBell className="text-xl cursor-pointer"/>

        <FaUserCircle className="text-3xl"/>

      </div>

    </div>
  );
}