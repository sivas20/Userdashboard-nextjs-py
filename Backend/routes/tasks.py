from flask import Blueprint, jsonify, request, session
from database.db import db
from models.user_model import Task

task_routes = Blueprint("tasks", __name__)


@task_routes.route("/newtask", methods=["POST"])
def create_task():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    data = request.json
    title = data["title"]
    description = data["description"]
    date = data["date"]

    new_task = Task(
        user_id=user_id,
        title=title,
        description=description,
        date=date
    )

    db.session.add(new_task)
    db.session.commit()

    return jsonify({"message": "Task created successfully"})

@task_routes.route("/tasks", methods=["GET"])
def get_tasks():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    tasks = Task.query.filter_by(user_id=user_id).all()

    result = []
    for t in tasks:
        result.append({
            "id": t.id,
            "title": t.title,
            "date": t.date,
        })

    return jsonify(result)  

@task_routes.route("/deletetask/<int:task_id>", methods=["DELETE"])
def delete_task(task_id):
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    task = Task.query.filter_by(id=task_id, user_id=user_id).first()

    if not task:
        return jsonify({"error": "Task not found"}), 404

    db.session.delete(task)
    db.session.commit()

    return jsonify({"message": "Task deleted successfully"})

@task_routes.route("/task/<int:task_id>", methods=["GET"])
def get_task(task_id):
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    task = Task.query.filter_by(id=task_id, user_id=user_id).first()

    if not task:
        return jsonify({"error": "Task not found"}), 404

    return jsonify({
        "title": task.title,
        "description": task.description,
        "date": task.date
    })
