from flask import Blueprint, jsonify, request, session
from werkzeug.security import generate_password_hash, check_password_hash
import random
import time

from database.db import db
from models.user_model import User, secretmessage
from config import TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM_NUMBER
from twilio.rest import Client

auth_routes = Blueprint("auth", __name__)

Client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

otp_store = {}


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

@auth_routes.route("/sendotp", methods=["POST"])
def send_otp():
    data = request.json
    phone = data.get("phone")

    if not phone:
        return jsonify({"error": "Phone number required"}), 400

    otp = random.randint(100000, 999999)
    otp_store[phone] = {"otp": otp, "expires": time.time() + 300}  # expires in 5 minutes
    try:
        message = Client.messages.create(
            body=f"From Daily App, Your OTP is: {otp}. Use this to reset your password and do not share it with anyone. it will expire in 5 minutes.",
            from_=TWILIO_FROM_NUMBER,
            to=phone
        )
    except Exception as e:
        return jsonify({"error": "Failed to send OTP"}), 500

    return jsonify({"message": "OTP sent successfully"})

@auth_routes.route("/verifyotp", methods=["POST"])
def verify_otp():
    data = request.json
    phone = data.get("phone")
    otp = data.get("otp")

    if not phone or not otp:
        return jsonify({"error": "Phone number and OTP required"}), 400

    if phone in otp_store:
        stored_otp_info = otp_store[phone]
        if time.time() > stored_otp_info["expires"]:
            del otp_store[phone]
            return jsonify({"error": "OTP expired"}), 400

        if str(stored_otp_info["otp"]) == str(otp):
            del otp_store[phone]
            session["phone"] = phone
            return jsonify({"message": "OTP verified successfully"})
        else:
            return jsonify({"error": "Invalid OTP"}), 400
    else:
        return jsonify({"error": "No OTP sent to this phone number"}), 404


@auth_routes.route("/logout", methods=["POST"])
def logout():
    session.pop("user_id", None)
    return jsonify({"message": "Logged out successfully"})

@auth_routes.route("/me", methods=["GET"])
def get_me():
    if "user_id" not in session:
        return jsonify({"error": "Unauthorized"}), 401

    return jsonify({"message": "Logged in"})

@auth_routes.route("/createmessagepassword", methods=["POST"])
def create_message_password():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    data = request.json
    password = data.get("password")

    if not password:
        return jsonify({"error": "Password required"}), 400

    hashed_password = generate_password_hash(password)

    new_secret_message = secretmessage(
        user_id=user_id,
        password=hashed_password
    )

    db.session.add(new_secret_message)
    db.session.commit()

    return jsonify({"message": "Message password created successfully"})

@auth_routes.route("/verifymessagepassword", methods=["POST"])
def check_message_password():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    data = request.json
    password = data.get("password")

    if not password:
        return jsonify({"error": "Password required"}), 400

    secret_message = secretmessage.query.filter_by(user_id=user_id).first()

    if not secret_message:
        return jsonify({"error": "No message password set"}), 404

    if check_password_hash(secret_message.password, password):
        return jsonify({"message": "Password is correct"})
    else:
        return jsonify({"message": "Incorrect password"}), 401
    
@auth_routes.route("/checkmessagepassword", methods=["GET"])
def check_message_password_exists():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    secret_message = secretmessage.query.filter_by(user_id=user_id).first()

    if secret_message:
        return jsonify({"exists": True})
    else:
        return jsonify({"exists": False})

@auth_routes.route("/resetpassword", methods=["PATCH"])
def reset_password():
    data = request.json
    phone = session.get("phone")
    new_password = data.get("new_password")

    if not phone or not new_password:
        return jsonify({"error": "Phone number and new password required"}), 400

    user = User.query.filter_by(phone=phone).first()
    if not user:
        return jsonify({"error": "User not found"}), 404

    hashed_password = generate_password_hash(new_password)
    user.password = hashed_password
    db.session.commit()
    session.pop("phone", None)

    return jsonify({"message": "Password reset successfully"})