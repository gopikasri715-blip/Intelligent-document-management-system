from flask import Blueprint, request, jsonify, current_app
from werkzeug.utils import secure_filename
from uuid import uuid4
import os

from app.extensions import db
from app.models.document import Document
from app.models.activity import Activity
from app.utils.ocr import extract_text

document = Blueprint("document", __name__)


@document.route("/api/upload", methods=["POST"])
def upload_document():

    if "file" not in request.files:
        return jsonify({
            "message": "No file uploaded"
        }), 400

    file = request.files["file"]

    if file.filename == "":
        return jsonify({
            "message": "No file selected"
        }), 400

    filename = secure_filename(file.filename)

    unique_filename = f"{uuid4()}_{filename}"

    filepath = os.path.join(
        current_app.config["UPLOAD_FOLDER"],
        unique_filename
    )

    file.save(filepath)
    extracted_text = ""

    if filename.lower().endswith(
    (".png", ".jpg", ".jpeg", ".bmp", ".tiff")
):
        extracted_text = extract_text(filepath)
    document_data = Document(

        filename=unique_filename,

        original_filename=filename,

        file_type=filename.split(".")[-1].lower(),

        file_size=round(os.path.getsize(filepath) / 1024, 2),

        extracted_text=extracted_text,

        uploaded_by=1
        

    )

    db.session.add(document_data)

    db.session.commit()

    activity = Activity(
    activity_type="UPLOAD",
    description=f"Uploaded document: {document_data.original_filename}",
    document_id=document_data.id,
    user_id=1
)

    db.session.add(activity)
    db.session.commit()

    return jsonify({

        "message": "File uploaded successfully",

        "document_id": document_data.id

    }), 201
@document.route("/api/documents", methods=["GET"])
def get_documents():

    documents = Document.query.order_by(
        Document.upload_date.desc()
    ).all()

    data = []

    for doc in documents:

        data.append({

            "id": doc.id,

            "filename": doc.original_filename,

            "stored_filename": doc.filename,

            "file_type": doc.file_type,

            "file_size": doc.file_size,

            "category": doc.category,

            "upload_date": doc.upload_date.strftime("%Y-%m-%d %H:%M")

        })

    return jsonify({

        "total": len(data),

        "documents": data

    })

@document.route("/api/search", methods=["GET"])
def search_documents():

    query = request.args.get("query")

    if not query:
        return jsonify({
            "message": "Search query required"
        }), 400

    documents = Document.query.filter(
        Document.original_filename.ilike(f"%{query}%")
    ).all()

    data = []

    for doc in documents:

        data.append({

            "id": doc.id,

            "filename": doc.original_filename,

            "file_type": doc.file_type,

            "file_size": doc.file_size,

            "upload_date": doc.upload_date.strftime("%Y-%m-%d %H:%M")

        })

    return jsonify({

        "total": len(data),

        "documents": data

    })
@document.route("/api/documents/<int:document_id>", methods=["GET"])
def get_document(document_id):

    document = Document.query.get(document_id)

    if not document:
        return jsonify({
            "message": "Document not found"
        }), 404

    return jsonify({

        "id": document.id,

        "filename": document.original_filename,

        "stored_filename": document.filename,

        "file_type": document.file_type,

        "file_size": document.file_size,

        "category": document.category,

        "upload_date": document.upload_date.strftime("%Y-%m-%d %H:%M"),

        "uploaded_by": document.uploaded_by,

        "extracted_text": document.extracted_text

    })
@document.route("/api/documents/<int:document_id>", methods=["DELETE"])
def delete_document(document_id):

    document = Document.query.get(document_id)

    if not document:
        return jsonify({
            "message": "Document not found"
        }), 404

    filepath = os.path.join(
        current_app.config["UPLOAD_FOLDER"],
        document.filename
    )

    if os.path.exists(filepath):
        os.remove(filepath)

    activity = Activity(
        activity_type="DELETE",
        description=f"Deleted document: {document.original_filename}",
        document_id=document.id,
        user_id=1
    )

    db.session.add(activity)

    db.session.delete(document)

    db.session.commit()

    return jsonify({
        "message": "Document deleted successfully"
    })
@document.route("/api/documents/<int:document_id>/category", methods=["PUT"])
def update_category(document_id):

    document = Document.query.get(document_id)

    if not document:
        return jsonify({
            "message": "Document not found"
        }), 404

    data = request.get_json()

    document.category = data.get("category")

    db.session.commit()

    activity = Activity(
        activity_type="UPDATE",
        description=f"Updated category for {document.original_filename}",
        document_id=document.id,
        user_id=1
    )

    db.session.add(activity)
    db.session.commit()

    return jsonify({
        "message": "Category updated successfully"
    })