import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import api from "../services/api";

export default function DocumentDetails() {

    const { id } = useParams();

    const [document, setDocument] = useState(null);

    useEffect(() => {

        fetchDocument();

    }, []);

    const fetchDocument = async () => {

        try {

            const response = await api.get(`/api/documents/${id}`);

            setDocument(response.data);

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

                    <div>

                        <p className="text-zinc-400">Category</p>

                        <h2 className="text-xl font-semibold">

                            {document.category || "Not Assigned"}

                        </h2>

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

                    <button className="bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-700">

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