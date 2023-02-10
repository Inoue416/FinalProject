from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import os
from dotenv import load_dotenv
from flask_marshmallow import Marshmallow


# Loading env
load_dotenv()

# Making app
app = Flask(
    __name__, 
    static_folder='../frontend/dist/static',
    template_folder='../frontend/dist'
)

# Setting db config
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DB_URI']
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.secret_key = os.environ['APP_SECRET_KEY']

# Database setting
db = SQLAlchemy(app)
ma = Marshmallow(app)

# Loading models
from models.users import Users
from models.things import Things
from models.points import Points
# Init tables
with app.app_context():
    db.create_all()

import routes  # view import

if __name__ in '__main__':
    app.run(debug=True)  # Run app