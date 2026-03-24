from database.db import db

class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(20), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)


class Userdata(db.Model):
    __tablename__ = "userdata"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    full_name = db.Column(db.String(150))
    gender = db.Column(db.String(10))
    email = db.Column(db.String(120))
    about = db.Column(db.Text)
    profile_picture = db.Column(db.String(255))


class Task(db.Model):
    __tablename__ = "tasks"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    date = db.Column(db.Date)


class Memory(db.Model):
    __tablename__ = "memories"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    date = db.Column(db.Date)
    place = db.Column(db.String(200))
    description = db.Column(db.Text)
    image_urls = db.Column(db.Text)

class DiaryEntry(db.Model):
    __tablename__ = "diary_entries"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    date = db.Column(db.Date)
    content = db.Column(db.Text)
    image_urls = db.Column(db.Text)

class Secret(db.Model):
    __tablename__ = "secrets"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    title = db.Column(db.String(200), nullable=False)
    content = db.Column(db.Text)

