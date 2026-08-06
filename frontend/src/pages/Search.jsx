import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Search() {

    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const navigate = useNavigate();

    const handleSearch = async (value) => {

        setQuery(value);

        if (value.trim() === "") {
            setResults([]);
            return;
        }

        try {

            const response = await api.get(`/api/search?query=${value}`);

            setResults(response.data.documents);

        } catch (err) {
            console.error(err);
        }

    };
    const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
        "Are you sure you want to delete this document?"
    );

    if (!confirmDelete) return;

    try {

        await api.delete(`/api/documents/${id}`);

        setResults(results.filter(doc => doc.id !== id));

        alert("Document deleted successfully.");

    } catch (err) {

        console.error(err);

        alert("Delete failed.");

    }

};
    return (

        <MainLayout>

            <h1 className="text-3xl font-bold mb-6">
                Search Documents
            </h1>

            <input
                type="text"
                placeholder="Search by filename or OCR text..."
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full p-4 rounded-lg bg-zinc-900 border border-zinc-700 outline-none mb-8"
            />

            <div className="space-y-4">

                {results.map((doc) => (

                    <div
                        key={doc.id}
                        className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 flex justify-between items-center"
                    >

                        <div>

                            <h2 className="text-xl font-semibold">
                                {doc.filename}
                            </h2>

                            <p className="text-zinc-400">
                                {doc.file_type.toUpperCase()} • {doc.file_size} KB
                            </p>

                        </div>

                        <div className="flex gap-3">

                            <button
    onClick={() => navigate(`/document/${doc.id}`)}
    className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700"
>
    View
</button>

                            <button
    onClick={() => handleDelete(doc.id)}
    className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700"
>
    Delete
</button>

                        </div>

                    </div>

                ))}

            </div>

        </MainLayout>

    );

}