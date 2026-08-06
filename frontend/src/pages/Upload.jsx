import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import api from "../services/api";

export default function Upload() {

    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleUpload = async () => {

        if (!file) {
            alert("Please select a file.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        setLoading(true);

        try {

            const response = await api.post(
                "/api/upload",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            setMessage(response.data.message);
            setTimeout(() => {
    window.location.href = "/";
}, 1200);
            setFile(null);


        } catch (err) {

            console.error(err);

            setMessage("Upload Failed");

        }

        setLoading(false);

    };

    return (

        <MainLayout>

            <h1 className="text-3xl font-bold mb-8">
                Upload Document
            </h1>

            <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-8">

                <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="mb-6"
                />

                <br />
                {file && (
    <p className="text-purple-400 mb-4">
        Selected File: {file.name}
    </p>
)}
                <button
                    onClick={handleUpload}
                    disabled={loading}
                    className={`px-6 py-3 rounded-lg ${
    loading
        ? "bg-gray-600 cursor-not-allowed"
        : "bg-purple-600 hover:bg-purple-700"
}`}
                >

                    {loading ? "Uploading..." : "Upload"}

                </button>

                <p className="mt-5 text-green-400">

                    {message}

                </p>

            </div>

        </MainLayout>

    );

}