from app import db
from datetime import datetime

class Points(db.Model):
    __tablename__ = "points"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    thing_id = db.Column(db.Integer, nullable=False)
    total = db.Column(db.Float, nullable=False)
    positive = db.Column(db.Float, nullable=False)
    negative = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now(), nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.now(), onupdate=datetime.now(), nullable=False)
