
import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import api from "../services/api";

import {
  FaFolder,
  FaFilePdf,
  FaImage,
  FaSave,
} from "react-icons/fa";

export default function Categories() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    "Invoice",
    "Resume",
    "Report",
    "Academic",
    "Personal",
    "Other",
  ];

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await api.get("/api/documents");

      setDocuments(response.data.documents || []);
    } catch (error) {
      console.error("Failed to fetch documents:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateCategory = async (id, category) => {
    try {
      await api.put(
        `/api/documents/${id}/category`,
        {
          category: category,
        }
      );

      setDocuments((previousDocuments) =>
        previousDocuments.map((doc) =>
          doc.id === id
            ? { ...doc, category: category }
            : doc
        )
      );

      alert("Category updated successfully");
    } catch (error) {
      console.error("Category update error:", error);

      alert("Failed to update category");
    }
  };

  const getFileIcon = (type) => {
    if (type === "pdf") {
      return (
        <FaFilePdf className="text-red-400 text-2xl" />
      );
    }

    return (
      <FaImage className="text-blue-400 text-2xl" />
    );
  };

  return (
    <MainLayout>

      {/* TITLE */}

      <div className="mb-6">

        <h1 className="text-4xl font-bold">
          Categories
        </h1>

        <p className="text-zinc-400 mt-1">
          Organize your documents by category
        </p>

      </div>


      {/* CATEGORY SUMMARY */}

      <div className="grid grid-cols-4 gap-4 mb-6">

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">

          <FaFolder className="text-purple-400 text-2xl mb-3" />

          <h2 className="text-3xl font-bold">
            {documents.length}
          </h2>

          <p className="text-zinc-400">
            Total Documents
          </p>

        </div>


        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">

          <FaFolder className="text-green-400 text-2xl mb-3" />

          <h2 className="text-3xl font-bold">
            {
              documents.filter(
                (doc) => doc.category
              ).length
            }
          </h2>

          <p className="text-zinc-400">
            Categorized
          </p>

        </div>


        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">

          <FaFolder className="text-yellow-400 text-2xl mb-3" />

          <h2 className="text-3xl font-bold">
            {
              documents.filter(
                (doc) => !doc.category
              ).length
            }
          </h2>

          <p className="text-zinc-400">
            Unassigned
          </p>

        </div>


        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">

          <FaFolder className="text-blue-400 text-2xl mb-3" />

          <h2 className="text-3xl font-bold">
            {categories.length}
          </h2>

          <p className="text-zinc-400">
            Available Categories
          </p>

        </div>

      </div>


      {/* DOCUMENT LIST */}

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">

        <h2 className="text-xl font-semibold mb-5">
          Document Categories
        </h2>

        {loading ? (

          <div className="text-zinc-400">
            Loading documents...
          </div>

        ) : documents.length === 0 ? (

          <div className="text-zinc-500 text-center py-10">
            No documents available
          </div>

        ) : (

          <div className="space-y-3">

            {documents.map((doc) => (

              <div
                key={doc.id}
                className="bg-zinc-800 rounded-xl p-4 flex items-center justify-between hover:bg-zinc-700 transition"
              >

                {/* FILE INFO */}

                <div className="flex items-center gap-4">

                  {getFileIcon(doc.file_type)}

                  <div>

                    <p className="font-semibold">
                      {doc.filename}
                    </p>

                    <p className="text-sm text-zinc-400">
                      {doc.file_type.toUpperCase()} •{" "}
                      {doc.file_size} KB
                    </p>

                  </div>

                </div>


                {/* CATEGORY */}

                <div className="flex items-center gap-3">

                  <select
                    value={doc.category || ""}
                    onChange={(e) =>
                      updateCategory(
                        doc.id,
                        e.target.value
                      )
                    }
                    className="bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 outline-none focus:border-purple-500"
                  >

                    <option value="">
                      Select Category
                    </option>

                    {categories.map((category) => (

                      <option
                        key={category}
                        value={category}
                      >
                        {category}
                      </option>

                    ))}

                  </select>

                  <FaSave className="text-zinc-500" />

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </MainLayout>
  );
}

