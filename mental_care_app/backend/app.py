from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(
    __name__, 
    static_folder='../frontend/dist/static',
    template_folder='../frontend/dist'
)

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DB_URI']
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)

from models.users import Users
from models.things import Things
from models.points import Points

with app.app_context():
    db.create_all()

if __name__ in '__main__':
    app.run(debug=True)