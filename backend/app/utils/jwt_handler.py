import jwt
import datetime
from functools import wraps
from flask import request, jsonify

SECRET_KEY = "idms_secret_key"


def generate_token(user_id):

    payload = {
        "user_id": user_id,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=24)
    }

    token = jwt.encode(
        payload,
        SECRET_KEY,
        algorithm="HS256"
    )

    return token


def token_required(f):

    @wraps(f)
    def decorated(*args, **kwargs):

        token = None

        # Get Authorization header
        auth_header = request.headers.get("Authorization")

        if auth_header:
            try:
                # Expected:
                # Authorization: Bearer <token>

                token = auth_header.split(" ")[1]

            except IndexError:
                return jsonify({
                    "message": "Invalid authorization header"
                }), 401

        if not token:
            return jsonify({
                "message": "Token is missing"
            }), 401

        try:

            payload = jwt.decode(
                token,
                SECRET_KEY,
                algorithms=["HS256"]
            )

            user_id = payload.get("user_id")

            if not user_id:
                return jsonify({
                    "message": "Invalid token"
                }), 401

        except jwt.ExpiredSignatureError:

            return jsonify({
                "message": "Token has expired"
            }), 401

        except jwt.InvalidTokenError:

            return jsonify({
                "message": "Invalid token"
            }), 401

        return f(user_id=user_id, *args, **kwargs)

    return decorated