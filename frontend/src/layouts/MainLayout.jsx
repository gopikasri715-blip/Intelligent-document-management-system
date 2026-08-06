import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function MainLayout({ children }) {
  return (
    <div className="flex">

      <Sidebar />

      <div className="ml-64 flex-1">

        <Topbar />

        <div className="p-8">
          {children}
        </div>

      </div>

    </div>
  );
}