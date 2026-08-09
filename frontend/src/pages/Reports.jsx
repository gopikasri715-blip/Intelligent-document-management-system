import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import api from "../services/api";

import {
  FaFileAlt,
  FaFilePdf,
  FaImage,
  FaChartBar,
  FaDatabase,
} from "react-icons/fa";

import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

export default function Reports() {
  const [stats, setStats] = useState({
    total_documents: 0,
    pdf_files: 0,
    image_files: 0,
    today_uploads: 0,
  });

  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const statsRes = await api.get("/api/dashboard/stats");
      setStats(statsRes.data);

      const documentsRes = await api.get("/api/documents");
      setDocuments(documentsRes.data.documents || []);
    } catch (error) {
      console.error("Reports Error:", error);
    }
  };

  // ==================== FILE TYPE DATA ====================

  const fileTypeData = [
    {
      name: "PDF",
      value: stats.pdf_files,
    },
    {
      name: "Images",
      value: stats.image_files,
    },
  ];

  // ==================== CATEGORY DATA ====================

  const categoryCounts = {};

  documents.forEach((doc) => {
    const category = doc.category || "Unassigned";

    categoryCounts[category] =
      (categoryCounts[category] || 0) + 1;
  });

  const categoryData = Object.entries(categoryCounts).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

  // ==================== CHART COLORS ====================

  const COLORS = [
    "#a855f7",
    "#3b82f6",
    "#22c55e",
    "#eab308",
    "#ef4444",
    "#06b6d4",
  ];

  return (
    <MainLayout>

      {/* ==================== PAGE TITLE ==================== */}

      <div className="mb-6">

        <h1 className="text-4xl font-bold">
          Reports
        </h1>

        <p className="text-zinc-400 mt-1">
          Document statistics and storage insights
        </p>

      </div>


      {/* ==================== SUMMARY CARDS ==================== */}

      <div className="grid grid-cols-4 gap-4 mb-6">

        {/* Total Documents */}

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">

          <FaFileAlt className="text-purple-400 text-2xl mb-3" />

          <h2 className="text-3xl font-bold">
            {stats.total_documents}
          </h2>

          <p className="text-zinc-400 mt-1">
            Total Documents
          </p>

        </div>


        {/* PDF Files */}

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">

          <FaFilePdf className="text-red-400 text-2xl mb-3" />

          <h2 className="text-3xl font-bold">
            {stats.pdf_files}
          </h2>

          <p className="text-zinc-400 mt-1">
            PDF Files
          </p>

        </div>


        {/* Image Files */}

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">

          <FaImage className="text-blue-400 text-2xl mb-3" />

          <h2 className="text-3xl font-bold">
            {stats.image_files}
          </h2>

          <p className="text-zinc-400 mt-1">
            Image Files
          </p>

        </div>


        {/* Today's Uploads */}

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">

          <FaDatabase className="text-green-400 text-2xl mb-3" />

          <h2 className="text-3xl font-bold">
            {stats.today_uploads}
          </h2>

          <p className="text-zinc-400 mt-1">
            Today's Uploads
          </p>

        </div>

      </div>


      {/* ==================== CHARTS ==================== */}

      <div className="grid grid-cols-2 gap-5">


        {/* ==================== FILE TYPE CHART ==================== */}

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">

          <div className="flex items-center gap-3 mb-4">

            <FaChartBar className="text-purple-400" />

            <h2 className="text-xl font-semibold">
              File Type Distribution
            </h2>

          </div>

          <div className="h-64">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <PieChart>

                <Pie
                  data={fileTypeData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label
                >

                  {fileTypeData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index]}
                    />
                  ))}

                </Pie>

                <Tooltip />

                <Legend />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>


        {/* ==================== CATEGORY CHART ==================== */}

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">

          <div className="flex items-center gap-3 mb-4">

            <FaChartBar className="text-blue-400" />

            <h2 className="text-xl font-semibold">
              Documents by Category
            </h2>

          </div>

          <div className="h-64">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <BarChart data={categoryData}>

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#3f3f46"
                />

                <XAxis
                  dataKey="name"
                  stroke="#a1a1aa"
                />

                <YAxis
                  allowDecimals={false}
                  stroke="#a1a1aa"
                />

                <Tooltip />

                <Bar
                  dataKey="value"
                  fill="#a855f7"
                  radius={[6, 6, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>


      {/* ==================== REPORT SUMMARY ==================== */}

      <div className="mt-5 bg-zinc-900 border border-zinc-800 rounded-xl p-5">

        <h2 className="text-xl font-semibold mb-4">
          Report Summary
        </h2>

        <div className="grid grid-cols-3 gap-4">


          {/* Total */}

          <div className="bg-zinc-800 rounded-lg p-4">

            <p className="text-zinc-400 text-sm">
              Total Documents
            </p>

            <p className="text-2xl font-bold mt-1">
              {stats.total_documents}
            </p>

          </div>


          {/* Categorized */}

          <div className="bg-zinc-800 rounded-lg p-4">

            <p className="text-zinc-400 text-sm">
              Categorized Documents
            </p>

            <p className="text-2xl font-bold mt-1">

              {
                documents.filter(
                  (doc) => doc.category
                ).length
              }

            </p>

          </div>


          {/* Unassigned */}

          <div className="bg-zinc-800 rounded-lg p-4">

            <p className="text-zinc-400 text-sm">
              Unassigned Documents
            </p>

            <p className="text-2xl font-bold mt-1">

              {
                documents.filter(
                  (doc) => !doc.category
                ).length
              }

            </p>

          </div>

        </div>

      </div>

    </MainLayout>
  );
}