from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from app.extensions import db
from app.models.user import User
from app.utils.jwt_handler import generate_token

auth = Blueprint("auth", __name__)


@auth.route("/api/register", methods=["POST"])
def register():

    data = request.get_json()

    full_name = data.get("full_name")
    email = data.get("email")
    password = data.get("password")

    if not full_name or not email or not password:
        return jsonify({
            "message": "All fields are required"
        }), 400

    existing_user = User.query.filter_by(email=email).first()

    if existing_user:
        return jsonify({
            "message": "Email already exists"
        }), 400

    hashed_password = generate_password_hash(password)

    user = User(
        full_name=full_name,
        email=email,
        password=hashed_password
    )

    db.session.add(user)
    db.session.commit()

    return jsonify({
        "message": "Registration successful"
    }), 201

@auth.route("/api/login", methods=["POST"])
def login():

    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    if not email or not password:

        return jsonify({
            "message": "Email and Password required"
        }), 400

    user = User.query.filter_by(email=email).first()

    if not user:

        return jsonify({
            "message": "User not found"
        }), 404

    if not check_password_hash(user.password, password):

        return jsonify({
            "message": "Invalid password"
        }), 401

    token = generate_token(user.id)

    return jsonify({

        "message": "Login Successful",

        "token": token,

        "user": {

            "id": user.id,
            "name": user.full_name,
            "email": user.email

        }

    }), 200