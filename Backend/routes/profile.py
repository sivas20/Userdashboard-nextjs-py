from flask import Blueprint, jsonify, request, session
from database.db import db
from models.user_model import User, Userdata

profile_routes = Blueprint("profile", __name__)

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
        "profile_picture": userdata.profile_picture if userdata else ""
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
        "image": usp.profile_picture if usp else "",
        "phone": userd.phone
    }

    return jsonify(profid)

@profile_routes.route("/profile/update", methods=["PATCH"])
def update_profile():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    data = request.json

    full_name = data.get("full_name")
    gender = data.get("gender")
    email = data.get("email")
    about = data.get("about")
    profile_picture = data.get("profile_picture")

    userdata = Userdata.query.filter_by(user_id=user_id).first()

    if not userdata:
        userdata = Userdata(user_id=user_id)
        db.session.add(userdata)

    userdata.full_name = full_name
    userdata.gender = gender
    userdata.email = email
    userdata.about = about
    userdata.profile_picture = profile_picture

    db.session.commit()

    return jsonify({"message": "Profile updated successfully"})