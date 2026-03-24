from flask import Blueprint, jsonify, request, session
from werkzeug.security import generate_password_hash, check_password_hash

from database.db import db
from models.user_model import User

auth_routes = Blueprint("auth", __name__)


@auth_routes.route("/register", methods=["POST"])
def create_user():
    data = request.json

    username = data["username"]
    phone = data["phone"]
    password = data["password"]

    hashed_password = generate_password_hash(password)

    new_user = User(
        username=username,
        phone=phone,
        password=hashed_password
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User created successfully"})


@auth_routes.route("/login", methods=["POST"])
def login():
    data = request.json

    username = data["username"]
    password = data["password"]

    user = User.query.filter_by(username=username).first()

    if user and check_password_hash(user.password, password):
        session["user_id"] = user.id
        return jsonify({
            "user_id": user.id})
    else:
        return jsonify({"message": "Invalid username or password"}), 401

@auth_routes.route("/api/user", methods=["GET"])
def get_user():
    if "user_id" not in session:
        return jsonify({"error": "Unauthorized"}), 401

    user = User.query.get(session["user_id"])

    return jsonify({
        "username": user.username,
        "profileImage": None
    })

@auth_routes.route("/logout", methods=["POST"])
def logout():
    session.pop("user_id", None)
    return jsonify({"message": "Logged out successfully"})

@auth_routes.route("/me", methods=["GET"])
def get_me():
    if "user_id" not in session:
        return jsonify({"error": "Unauthorized"}), 401

    return jsonify({"message": "Logged in"})