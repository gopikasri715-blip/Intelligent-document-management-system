import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import api from "../services/api";

export default function DocumentDetails() {

    const { id } = useParams();

    const [document, setDocument] = useState(null);
    const [category, setCategory] = useState("");
const [editingCategory, setEditingCategory] = useState(false);

    useEffect(() => {

        fetchDocument();

    }, []);

    const fetchDocument = async () => {

        try {

            const response = await api.get(`/api/documents/${id}`);

            setDocument(response.data);
            setCategory(response.data.category || "");

        }

        catch(err){

            console.error(err);

        }

    };

    if(!document){

        return(

            <MainLayout>

                <h2 className="text-2xl">Loading...</h2>

            </MainLayout>

        );

    }
const handleCategorySave = async () => {

    try {

        await api.put(
            `/api/documents/${id}/category`,
            {
                category: category
            }
        );

        setDocument({
            ...document,
            category: category
        });

        setEditingCategory(false);

        alert("Category updated successfully");

    } catch (error) {

        console.error(error);

        alert("Failed to update category");

    }
};
    return(

        <MainLayout>

            <h1 className="text-3xl font-bold mb-8">

                Document Details

            </h1>

            <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-8">

                <div className="grid grid-cols-2 gap-6">

                    <div>

                        <p className="text-zinc-400">Filename</p>

                        <h2 className="text-xl font-semibold">

                            {document.filename}

                        </h2>

                    </div>

                    <div>

                        <p className="text-zinc-400">File Type</p>

                        <h2 className="text-xl font-semibold">

                            {document.file_type.toUpperCase()}

                        </h2>

                    </div>

                    <div>

                        <p className="text-zinc-400">File Size</p>

                        <h2 className="text-xl font-semibold">

                            {document.file_size} KB

                        </h2>

                    </div>

                    <div>

                        <p className="text-zinc-400">Upload Date</p>

                        <h2 className="text-xl font-semibold">

                            {document.upload_date}

                        </h2>

                    </div>

                    <div className="mt-6">

    <p className="text-zinc-400 text-lg mb-2">
        Category
    </p>

    {!editingCategory ? (

        <div className="flex items-center gap-4">

            <h2 className="text-xl font-semibold">
                {document.category || "Not Assigned"}
            </h2>

            <button
                onClick={() => setEditingCategory(true)}
                className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-lg font-semibold"
            >
                Edit Category
            </button>

        </div>

    ) : (

        <div className="flex items-center gap-3">

            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white outline-none"
            >

                <option value="">
                    Select Category
                </option>

                <option value="Invoice">
                    Invoice
                </option>

                <option value="Resume">
                    Resume
                </option>

                <option value="Academic">
                    Academic
                </option>

                <option value="Work">
                    Work
                </option>

                <option value="Personal">
                    Personal
                </option>

                <option value="Others">
                    Others
                </option>

            </select>

            <button
                onClick={handleCategorySave}
                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-semibold"
            >
                Save
            </button>

            <button
                onClick={() => {
                    setCategory(document.category || "");
                    setEditingCategory(false);
                }}
                className="bg-zinc-700 hover:bg-zinc-600 px-4 py-2 rounded-lg font-semibold"
            >
                Cancel
            </button>

        </div>

    )}

</div>

                </div>

                <div className="mt-10">

                    <h2 className="text-2xl font-bold mb-4">

                        OCR Extracted Text

                    </h2>

                    <div className="bg-zinc-800 rounded-xl p-5 min-h-[220px] whitespace-pre-wrap">

                        {document.extracted_text || "No OCR Text Available"}

                    </div>

                </div>

                <div className="flex gap-4 mt-8">

                    <button
  onClick={() => {
    window.open(
      `http://127.0.0.1:5000/api/documents/${id}/download`,
      "_blank"
    );
  }}
  className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold"
>
  Download
</button>

                    <button className="bg-yellow-600 px-6 py-3 rounded-lg hover:bg-yellow-700">

                        Edit Category

                    </button>

                    <button className="bg-red-600 px-6 py-3 rounded-lg hover:bg-red-700">

                        Delete

                    </button>

                </div>

            </div>

        </MainLayout>

    );

}