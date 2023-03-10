from app import app, db
from flask import render_template, request, jsonify, make_response, session
from models.users import Users, UsersSchema
from models.things import Things, ThingsSchema
from models.points import Points, PointsSchema
from flask_bcrypt import Bcrypt
from validators.auth import *
from EmotionClassification import EmotionClassification
from validators.hakidasi import *
from datetime import datetime
from sqlalchemy import func as F, extract, and_


bcrypt = Bcrypt(app)
classificator = EmotionClassification()

# login状態の確認を行う
def check_login():
    if session.get("user_id"):
        print("Already login: ")
        print(session["user_id"])
        return True
    return False

@app.route("/api/is_login", methods=["GET"])
def is_login():
    if check_login():
        return jsonify({"username": session["username"], "message": "AL"})
    return jsonify({"username":"", "message":"NL"})

@app.route("/api/login", methods=["POST"])
def login():
    if check_login():
        print(session.get("user_id"))
        return jsonify({"message": "AL"})
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
        session["user_id"] = user.id
        session["username"] = user.username
        return jsonify({"message":"200", "username": user.username})
    return jsonify({"message":"Can not this method."})


@app.route("/api/logout", methods=["GET"])
def logout():
    session.clear()
    return jsonify({"message": "logout"})


@app.route("/api/registor", methods=["POST"])
def registor():
    if check_login():
        return jsonify({"message": "AL"})
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
        return jsonify({"message":"200"})
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


@app.route("/api/classification", methods=["POST"])
def classification():
    if not check_login():
        return jsonify({"success": False, "message": "NL"})
    if request.method == "POST":
        form_data = request.get_json()  # フォームデータの受け取り
        if not isTextLength(form_data["text"]):
            return jsonify({"success":False, "message": "入力にエラーがあります"})
        if hakidasiValidator(form_data["text"]):
            return jsonify({"success":False, "message": "入力にエラーがあります"})
        # ネガポジ判定
        classificator.classification(form_data["text"])
        now_time = datetime.now().replace(microsecond=0)
        try:
            thing = Things(
                user_id = session["user_id"],
                things = form_data["text"],
                total = round(classificator.positive - classificator.negative, 2),
                is_active = True,
                created_at = now_time,
                updated_at = now_time
            )
            db.session.add(thing)
            db.session.commit()
            point = Points(
                thing_id = thing.id,
                positive = classificator.positive,
                negative = classificator.negative,
                created_at = now_time,
                updated_at = now_time
            )
            db.session.add(point)
            db.session.commit()
            return jsonify({"success": True, "message": "データを記録しました"})
        except:
            return jsonify({"success":False, "message": "エラーが発生しました"})
    return jsonify({"success": False, "message":"Can not this method."})


@app.route("/api/get_data/<key>", methods=["GET"])
def get_data(key):
    if not check_login():
        return jsonify({"item": None, "message": "NL"})
    
    if request.method == "GET":
        print("get_data function...")
        items = None
        tschema = ThingsSchema(many=True)
        today = datetime.now()
        if key == "all":
            items = Things.query.filter_by(user_id=session["user_id"], is_active=True).order_by(Things.created_at.desc()).all()
        else:
            items = Things.query.filter(
                and_(extract('year', Things.created_at) == today.year, 
                extract('month', Things.created_at) == today.month, 
                extract('day', Things.created_at) == today.day)
            ).filter_by(
                user_id=session["user_id"], 
                is_active=True,
            ).order_by(Things.created_at.desc()).all()
            print(tschema.dump(items))
        return jsonify({"items": tschema.dump(items), "message": "send items."})
    return jsonify({"items": None, "message": "Can not this method."})


@app.route("/", defaults={"path":""})
@app.route("/<path:path>")
def index(path):
    return render_template("index.html")
