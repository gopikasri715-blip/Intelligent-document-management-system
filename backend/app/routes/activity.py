from flask import Blueprint, jsonify

from app.models.activity import Activity

activity = Blueprint("activity", __name__)


@activity.route("/api/activities", methods=["GET"])
def get_activities():

    activities = Activity.query.order_by(
        Activity.created_at.desc()
    ).limit(10).all()

    activity_list = []

    for item in activities:

        activity_list.append({

            "id": item.id,

            "activity_type": item.activity_type,

            "description": item.description,

            "user_id": item.user_id,

            "document_id": item.document_id,

            "created_at": item.created_at.strftime("%Y-%m-%d %H:%M")

        })

    return jsonify({

        "activities": activity_list,

        "total": len(activity_list)

    })