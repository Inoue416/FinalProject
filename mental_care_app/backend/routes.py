from app import app, db
from flask import render_template, request, jsonify
from models.users import Users
from models.things import Things
from models.points import Points
from flask_bcrypt import Bcrypt
from validators.signup import *

bcrypt = Bcrypt(app)

@app.route("/api/login", methods=["POST"])
def login():
    if request.method == "POST":
        print(request.get_json())
        return jsonify({"message":"OK"})
    return jsonify({"message":"NG"})

@app.route("/api/registor", methods=["POST"])
def registor():
    if request.method == "POST":
        form_data = request.get_json()
        if userNameValidator(form_data["username"]) != None:  # ユーザー名のバリデーション
            return jsonify({"message": "ユーザー名の入力にエラーがあります"})
        if emailValidator(form_data["email"]) == None:
            return jsonify({"message": "メールアドレスの入力にエラーがあります"})
        if passwordValidator(form_data["password"]) == None:
            return jsonify({"message": "パスワードの入力にエラーがあります"})
        if form_data["password"] != form_data["password_confirm"]:  # パスワードのバリデーション
            return jsonify({"message": "パスワードと確認の入力が一致していません"})
        hash_password = bcrypt.generate_password_hash(form_data["password"])
        user = Users(
            username = form_data["username"],
            email = form_data["email"],
            password = hash_password
        )
        try:
            db.session.add(user)
            db.session.commit()
        except:
            return jsonify({"message": "登録時にエラーが発生しました"})
        return jsonify({"message":"OK"})
    return jsonify({"message":"NG"})

@app.route("/", defaults={"path":""})
@app.route("/<path:path>")
def index(path):
    return render_template("index.html")
