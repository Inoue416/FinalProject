from app import app, db
from flask import render_template, request, jsonify
from models.users import Users
from models.things import Things
from models.points import Points
from flask_bcrypt import Bcrypt
from validators.auth import *


bcrypt = Bcrypt(app)


@app.route("/api/login", methods=["POST"])
def login():
    if request.method == "POST":
        form_data = request.get_json()
        if emailValidator(form_data["email"]) == None:
            return jsonify({"message": "メールアドレスの入力にエラーがあります"})
        if passwordLoginValidator(form_data["password"]) == None:
            return jsonify({"message": "パスワードの入力にエラーがあります"})
        user = Users.query.filter_by(email=form_data["email"]).first()
        if user == None:
            return jsonify({"message": "メールアドレスに間違いがあります"})
        if not(bcrypt.check_password_hash(user.password, form_data["password"])):
            return jsonify({"message": "パスワードに間違いがあります"})
        return jsonify({"message":""})
    return jsonify({"message":"Can not this method."})


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
        user = Users.query.filter_by(email=form_data["email"]).first()
        if user != None:
            return jsonify({"message": "このメールアドレスは既に使用されています"})
        hash_password = bcrypt.generate_password_hash(form_data["password"]).decode('utf-8')
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
        return jsonify({"message":""})
    return jsonify({"message":"Can not this method."})


@app.route("/api/check_email", methods=["POST"])
def check_email():
    if request.method == "POST":
        form_data = request.get_json()
        print("POST DATA : ")
        print(form_data["email"])
        user = Users.query.filter_by(email=form_data["email"]).first()
        print(user)
        if user == None:
            return jsonify({"message": ""})
        return jsonify({"message": "このメールアドレスは既に登録済みです"})
    return jsonify({"message": "Can not this method."})


@app.route("/", defaults={"path":""})
@app.route("/<path:path>")
def index(path):
    return render_template("index.html")
