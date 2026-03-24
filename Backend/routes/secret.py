from flask import Blueprint, jsonify, request, session
from database.db import db
from models.user_model import Secret
from cryptography.fernet import Fernet
from config import SECRET_KEY

secret_routes = Blueprint("secret", __name__)

cipher = Fernet(SECRET_KEY)

# CREATE SECRET
@secret_routes.route("/secrets", methods=["POST"])
def create_secret():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    data = request.json

    title = data.get("title")
    message = data.get("message")

    if not title or not message:
        return jsonify({"error": "Title and message required"}), 400

    # encrypt message
    encrypted_message = cipher.encrypt(message.encode()).decode()

    new_secret = Secret(
        user_id=user_id,
        title=title,
        message=encrypted_message
    )

    db.session.add(new_secret)
    db.session.commit()

    return jsonify({"message": "Secret saved successfully"})


# GET ALL SECRETS
@secret_routes.route("/secrets", methods=["GET"])
def get_secrets():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    secrets = Secret.query.filter_by(user_id=user_id).all()

    secret_list = []

    for s in secrets:
        # decrypt
        decrypted_message = cipher.decrypt(s.message.encode()).decode()

        secret_list.append({
            "id": s.id,
            "title": s.title,
            "message": decrypted_message
        })

    return jsonify(secret_list)


# GET SINGLE SECRET
@secret_routes.route("/secret/<int:secret_id>", methods=["GET"])
def get_secret(secret_id):
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    secret = Secret.query.filter_by(id=secret_id, user_id=user_id).first()

    if not secret:
        return jsonify({"error": "Secret not found"}), 404

    decrypted_message = cipher.decrypt(secret.message.encode()).decode()

    return jsonify({
        "id": secret.id,
        "title": secret.title,
        "message": decrypted_message
    })