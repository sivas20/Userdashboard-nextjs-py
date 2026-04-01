from flask import Blueprint, jsonify, request, session
from database.db import db
from models.user_model import Memory
import os
import uuid
import json

memory_routes = Blueprint("memory", __name__)


# CREATE MEMORY (UPDATED)
@memory_routes.route("/newmemories", methods=["POST"])
def create_memory():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    # get form data (NOT request.json)
    place = request.form.get("place")
    description = request.form.get("text")   # matches frontend
    date = request.form.get("date")

    images = request.files.getlist("images")

    upload_folder = "static/uploads/memories"
    os.makedirs(upload_folder, exist_ok=True)

    image_urls = []

    for image in images:
        if image:
            filename = str(uuid.uuid4()) + "_" + image.filename
            filepath = os.path.join(upload_folder, filename)

            image.save(filepath)
            image_urls.append(filepath)

    new_memory = Memory(
        user_id=user_id,
        place=place,
        description=description,
        date=date,
        image_urls=json.dumps(image_urls)   # store as JSON
    )

    db.session.add(new_memory)
    db.session.commit()

    return jsonify({"message": "Memory created successfully"})


# GET ALL MEMORIES
@memory_routes.route("/memories", methods=["GET"])
def get_memories():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    memories = Memory.query.filter_by(user_id=user_id).all()
    memory_list = []

    for m in memories:
        memory_list.append({
            "id": m.id,
            "place": m.place,
            "date": m.date,
            "description": m.description,
            "images": json.loads(m.image_urls) if m.image_urls else []
        })

    return jsonify(memory_list)


# DELETE MEMORY
@memory_routes.route("/memory/<int:memory_id>", methods=["DELETE"])
def delete_memory(memory_id):
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    memory = Memory.query.filter_by(id=memory_id, user_id=user_id).first()

    if not memory:
        return jsonify({"error": "Memory not found"}), 404

    db.session.delete(memory)
    db.session.commit()

    return jsonify({"message": "Memory deleted successfully"})


# GET SINGLE MEMORY
@memory_routes.route("/memory/<int:memory_id>", methods=["GET"])
def get_memory_details(memory_id):
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    memory = Memory.query.filter_by(id=memory_id, user_id=user_id).first()

    if not memory:
        return jsonify({"error": "Memory not found"}), 404

    return jsonify({
        "id": memory.id,
        "place": memory.place,
        "date": memory.date,
        "description": memory.description,
        "images": json.loads(memory.image_urls) if memory.image_urls else []
    })