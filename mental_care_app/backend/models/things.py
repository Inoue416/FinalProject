from app import db
from datetime import datetime

class Things(db.Model):
    __tablename__ = "things"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, nullable=False)
    things = db.Column(db.String(255), nullable=False)
    total = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now(), nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.now(), onupdate=datetime.now(), nullable=False)
