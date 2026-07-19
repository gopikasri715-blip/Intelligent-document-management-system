from flask import Blueprint, jsonify
from sqlalchemy import func
from datetime import date

from app.models.document import Document
from app.models.user import User

dashboard = Blueprint("dashboard", __name__)


@dashboard.route("/api/dashboard/stats", methods=["GET"])
def dashboard_stats():

    total_documents = Document.query.count()

    total_users = User.query.count()

    pdf_files = Document.query.filter(
        Document.file_type == "pdf"
    ).count()

    image_files = Document.query.filter(
        Document.file_type.in_(["png", "jpg", "jpeg", "bmp", "tiff"])
    ).count()

    today_uploads = Document.query.filter(
        func.date(Document.upload_date) == date.today()
    ).count()

    return jsonify({

        "total_documents": total_documents,

        "total_users": total_users,

        "pdf_files": pdf_files,

        "image_files": image_files,

        "today_uploads": today_uploads

    })