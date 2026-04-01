# =========================
# app.py - Flask Application
# =========================

from flask import Flask
from flask_cors import CORS
from urllib.parse import quote_plus

# -------------------------
# Database
# -------------------------
from database.db import db

# -------------------------
# Configuration
# -------------------------
from config import DB_HOST, DB_USER, DB_PASSWORD, DB_NAME

# -------------------------
# Create App
# -------------------------
app = Flask(__name__)
app.secret_key = "your_secret_key_here"

CORS(app, supports_credentials=True)

# -------------------------
# Database Config
# -------------------------
encoded_password = quote_plus(DB_PASSWORD)

app.config["SQLALCHEMY_DATABASE_URI"] = f"mysql+pymysql://{DB_USER}:{encoded_password}@{DB_HOST}/{DB_NAME}"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# -------------------------
# Initialize DB
# -------------------------
db.init_app(app)

# -------------------------
# 🔥 FORCE LOAD MODELS (VERY IMPORTANT)
# -------------------------
import models.user_model   # ✅ this ensures models are registered

# -------------------------
# Create Tables
# -------------------------
with app.app_context():
    print("Metadata BEFORE:", db.metadata.tables.keys())
    print("Creating tables...")
    db.create_all()
    print("Tables AFTER:", db.metadata.tables.keys())

# -------------------------
# Routes
# -------------------------
from routes.auth import auth_routes
from routes.tasks import task_routes
from routes.diary import diary_routes
from routes.memory import memory_routes
from routes.secret import secret_routes
from routes.profile import profile_routes
from routes.settings import settings_routes

app.register_blueprint(auth_routes)
app.register_blueprint(task_routes)
app.register_blueprint(diary_routes)
app.register_blueprint(memory_routes)
app.register_blueprint(secret_routes)
app.register_blueprint(profile_routes)
app.register_blueprint(settings_routes)

# -------------------------
# Run App
# -------------------------
if __name__ == "__main__":
    app.run(debug=True)