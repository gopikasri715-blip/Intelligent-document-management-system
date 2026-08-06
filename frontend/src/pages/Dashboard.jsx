import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import api from "../services/api";

import {
  FaFileAlt,
  FaRobot,
  FaClock,
  FaDatabase,
  FaUpload,
  FaSearch,
  FaChartBar,
} from "react-icons/fa";
export default function Dashboard() {
    const [stats, setStats] = useState({
        total_documents: 0,
        image_files: 0,
        pdf_files: 0,
        today_uploads: 0,
        total_users: 0,
    });

    const [recentUploads, setRecentUploads] = useState([]);

    const [activities, setActivities] = useState([]);
    useEffect(() => {
        fetchDashboard();
    }, []);

    const fetchDashboard = async () => {
    try {

        console.log("Fetching dashboard...");

        const statsRes = await api.get("/api/dashboard/stats");
        console.log("Stats:", statsRes.data);

        console.log("Before:", stats);

setStats(statsRes.data);

console.log("After:", statsRes.data);

        const uploadsRes = await api.get("/api/documents");
        console.log("Uploads:", uploadsRes.data);

        setRecentUploads(uploadsRes.data.documents);

        const activityRes = await api.get("/api/dashboard/activity");
        console.log("Activity:", activityRes.data);

        setActivities(activityRes.data.activities);

    } catch (err) {
        console.error("Dashboard Error:", err);
    }
};
    console.log("Rendering stats:", stats);
    return (
    <MainLayout>

      <h1 className="text-4xl font-bold mb-6">
        Dashboard
      </h1>

      {/* ==================== STATS ==================== */}

      <div className="grid grid-cols-4 gap-4">

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-purple-500 transition">
          <FaFileAlt className="text-purple-400 text-3xl mb-3" />
          <h2 className="text-3xl font-bold">{stats.total_documents}</h2>
          <p className="text-base text-zinc-400 mt-2">
            Total Documents
          </p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-green-500 transition">
          <FaRobot className="text-green-400 text-3xl mb-3" />
          <h2 className="text-3xl font-bold">{stats.image_files}</h2>
          <p className="text-base text-zinc-400 mt-2">
            OCR Processed
          </p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-yellow-500 transition">
          <FaClock className="text-yellow-400 text-3xl mb-3" />
          <h2 className="text-3xl font-bold">{stats.pdf_files}</h2>
          <p className="text-base text-zinc-400 mt-2">
            Pending OCR
          </p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-blue-500 transition">
          <FaDatabase className="text-blue-400 text-3xl mb-3" />
          <h2 className="text-3xl font-bold">{stats.today_uploads}</h2>
          <p className="text-base text-zinc-400 mt-2">
            Storage Used
          </p>
        </div>

      </div>
    

      {/* ==================== UPLOAD TRENDS ==================== */}

      <div className="mt-6 bg-zinc-900 border border-zinc-800 rounded-xl p-5">

        <h2 className="text-2xl font-semibold mb-4">
          Upload Trends
        </h2>

        <div className="h-48 rounded-xl border border-dashed border-zinc-700 flex items-center justify-center text-zinc-500">
          Upload Trends Chart (Coming Soon)
        </div>

      </div>

      {/* ==================== RECENT + ACTIVITY ==================== */}

      <div className="grid grid-cols-2 gap-4 mt-6">

        {/* Recent Uploads */}

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">

          <h2 className="text-xl font-semibold mb-4">
            Recent Uploads
          </h2>

          <div className="space-y-2">

    {recentUploads.slice(0,5).map((doc) => (

        <div
            key={doc.id}
            className="bg-zinc-800 rounded-lg p-3 hover:bg-zinc-700"
        >
            📄 {doc.filename}
        </div>

    ))}

</div>

        </div>

        {/* Activity */}

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">

          <h2 className="text-xl font-semibold mb-4">
            Activity Timeline
          </h2>

          <div className="space-y-2">

    {activities.map((activity) => (

        <div
            key={activity.id}
            className="bg-zinc-800 rounded-lg p-3"
        >

            <p className="font-semibold">
                {activity.activity_type}
            </p>

            <p className="text-sm text-zinc-400">
                {activity.description}
            </p>

            <p className="text-xs text-zinc-500 mt-1">
                {activity.created_at}
            </p>

        </div>

    ))}

</div>

        </div>

      </div>

      {/* ==================== QUICK ACTIONS ==================== */}

      <div className="grid grid-cols-3 gap-4 mt-6">

        <button className="bg-gradient-to-r from-purple-600 to-purple-500 rounded-xl py-5 text-lg font-bold flex items-center justify-center gap-2 hover:scale-105 transition">
          <FaUpload />
          Upload
        </button>

        <button className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl py-5 text-lg font-bold flex items-center justify-center gap-2 hover:scale-105 transition">
          <FaSearch />
          Search
        </button>

        <button className="bg-gradient-to-r from-green-600 to-green-500 rounded-xl py-5 text-lg font-bold flex items-center justify-center gap-2 hover:scale-105 transition">
          <FaChartBar />
          Reports
        </button>

      </div>

    </MainLayout>
  );
}