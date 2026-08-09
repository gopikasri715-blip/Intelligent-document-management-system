import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function MainLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-[#09090B]">

      <Sidebar />

      <div className="flex-1">

        <Topbar />

        <div className="p-8">
          {children}
        </div>

      </div>

    </div>
  );
}