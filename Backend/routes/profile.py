from flask import Blueprint, jsonify, request, session
from database.db import db
from models.user_model import User, Userdata
import os
from werkzeug.utils import secure_filename

profile_routes = Blueprint("profile", __name__)

UPLOAD_FOLDER = "static/uploads/profiles"

@profile_routes.route("/profile", methods=["GET"])
def get_profile():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    user = User.query.get(user_id)
    userdata = Userdata.query.filter_by(user_id=user_id).first()

    if not user:
        return jsonify({"error": "User not found"}), 404

    profile_data = {
        "phone": user.phone or "",
        "full_name": userdata.full_name if userdata else "",
        "gender": userdata.gender if userdata else "",
        "email": userdata.email if userdata else "",
        "about": userdata.about if userdata else "",
        "profile_picture": f"http://localhost:5000/{userdata.profile_picture}" if userdata and userdata.profile_picture else ""
    }

    return jsonify(profile_data)

@profile_routes.route("/profile/data", methods=["GET"])
def get_profile_data():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401
    
    userd = User.query.get(user_id)
    usp = Userdata.query.filter_by(user_id=user_id).first()

    if not userd:
        return jsonify({"error": "User not found"}), 404
    
    profid = {
        "username": userd.username,
        "image": f"http://localhost:5000/{usp.profile_picture}" if usp and usp.profile_picture else "",
        "phone": userd.phone
    }

    return jsonify(profid)

@profile_routes.route("/profile/update", methods=["PATCH"])
def update_profile():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    user = User.query.get(user_id)

    data = request.form
    full_name = data.get("full_name")
    gender = data.get("gender")
    email = data.get("email")
    about = data.get("about")

    userdata = Userdata.query.filter_by(user_id=user_id).first()

    if not userdata:
        userdata = Userdata(user_id=user_id)
        db.session.add(userdata)

    userdata.full_name = full_name
    userdata.gender = gender
    userdata.email = email
    userdata.about = about

    file = request.files.get("profile_picture")

    if file:
        ext = os.path.splitext(file.filename)[1]
        filename = secure_filename(user.username + ext)
        filepath = os.path.join(UPLOAD_FOLDER, filename)
        os.makedirs(UPLOAD_FOLDER, exist_ok=True)
        file.save(filepath)

        userdata.profile_picture = filepath

    db.session.commit()

    return jsonify({"message": "Profile updated successfully"})