from app import db, ma
from datetime import datetime

class Things(db.Model):
    __tablename__ = "things"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, nullable=False)
    things = db.Column(db.String(255), nullable=False)
    total = db.Column(db.Float, nullable=False)
    is_active = db.Column(db.Boolean, default=True, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now().replace(microsecond=0), nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.now().replace(microsecond=0), onupdate=datetime.now().replace(microsecond=0), nullable=False)

class ThingsSchema(ma.Schema):
    class Meta:
        fields = (
            "id",
            "things",
            "total",
            "updated_at"
        )