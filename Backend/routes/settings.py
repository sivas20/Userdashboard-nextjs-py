from flask import Blueprint, jsonify, request, session
from werkzeug.security import generate_password_hash, check_password_hash
from database.db import db
from models.user_model import User
import re

settings_routes = Blueprint("settings", __name__)

@settings_routes.route("/changepassword", methods=["PATCH"])
def change_password():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"message": "Unauthorized"}), 401

    data = request.json

    current_password = data.get("currentPassword")
    new_password = data.get("newPassword")

    if not current_password or not new_password:
        return jsonify({"message": "Current and new password required"}), 400

    user = User.query.get(user_id)

    if not user or not check_password_hash(user.password, current_password):
        return jsonify({"message": "Current password is incorrect"}), 400

    user.password = generate_password_hash(new_password)
    db.session.commit()

    return jsonify({"message": "Password changed successfully"})