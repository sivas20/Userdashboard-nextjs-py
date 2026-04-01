from flask import Blueprint, jsonify, request, session
from database.db import db
from models.user_model import DiaryEntry
import os
import uuid
import json

diary_routes = Blueprint("diary", __name__)


# CREATE DIARY
@diary_routes.route("/newdiary", methods=["POST"])
def create_diary():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    date = request.form.get("date")
    description = request.form.get("description")
    images = request.files.getlist("images")

    upload_folder = "static/uploads/diaries"
    os.makedirs(upload_folder, exist_ok=True)

    image_urls = []

    for image in images:
        if image:
            # fix + unique filename
            filename = str(uuid.uuid4()) + "_" + image.filename
            filepath = os.path.join(upload_folder, filename)

            image.save(filepath)
            image_urls.append(filepath)

    new_dairy = DiaryEntry(
        user_id=user_id,
        date=date,
        content=description,
        image_urls=json.dumps(image_urls)   # store as JSON
    )

    db.session.add(new_dairy)
    db.session.commit()

    return jsonify({"message": "Diary entry created successfully"})


# DELETE DIARY
@diary_routes.route("/dairy/<int:dairy_id>", methods=["DELETE"])
def delete_dairy(dairy_id):
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    dairy = DiaryEntry.query.filter_by(id=dairy_id, user_id=user_id).first()

    if not dairy:
        return jsonify({"error": "Diary entry not found"}), 404

    db.session.delete(dairy)
    db.session.commit()

    return jsonify({"message": "Diary entry deleted successfully"})


# GET ALL DIARIES
@diary_routes.route("/dairies", methods=["GET"])
def get_dai():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    dairies = DiaryEntry.query.filter_by(user_id=user_id).all()

    dm = []

    for d in dairies:
        dm.append({
            "id": d.id,
            "date": d.date,
            "description": d.content,
            "images": json.loads(d.image_urls) if d.image_urls else []
        })

    return jsonify(dm)


# GET SINGLE DIARY
@diary_routes.route("/dairy/<int:dairy_id>", methods=["GET"])
def get_dairy_details(dairy_id):
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    dairy = DiaryEntry.query.filter_by(id=dairy_id, user_id=user_id).first()

    if not dairy:
        return jsonify({"error": "Diary entry not found"}), 404

    return jsonify({
        "id": dairy.id,
        "date": dairy.date,
        "description": dairy.content,
        "images": json.loads(dairy.image_urls) if dairy.image_urls else []
    })