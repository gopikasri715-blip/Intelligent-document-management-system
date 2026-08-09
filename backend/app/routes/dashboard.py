from flask import Blueprint, jsonify
from sqlalchemy import func
from datetime import date

from app.models.document import Document
from app.models.user import User
from app.models.activity import Activity
from app.utils.jwt_handler import token_required

dashboard = Blueprint("dashboard", __name__)


# ================= Dashboard Stats =================

@dashboard.route("/api/dashboard/stats", methods=["GET"])
@token_required
def dashboard_stats(user_id):

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


# ================= Dashboard Activity =================

@dashboard.route("/api/dashboard/activity", methods=["GET"])
@token_required
def dashboard_activity(user_id):

    activities = Activity.query.order_by(
        Activity.created_at.desc()
    ).limit(10).all()

    return jsonify({
        "activities": [
            {
                "id": activity.id,
                "activity_type": activity.activity_type,
                "description": activity.description,
                "created_at": activity.created_at.strftime("%Y-%m-%d %H:%M")
            }
            for activity in activities
        ]
    })