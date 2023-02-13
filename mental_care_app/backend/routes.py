from app import app, db
from flask import render_template, request, jsonify
from models.users import Users, UsersSchema
from models.things import Things, ThingsSchema
from models.points import Points, PointsSchema
from flask_bcrypt import Bcrypt
from validators.auth import *
from EmotionClassification import EmotionClassification
from validators.hakidasi import *


bcrypt = Bcrypt(app)
classificator = EmotionClassification()

USER_ID = 3  # debug用


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

@app.route("/api/classification", methods=["POST"])
def classification():
    if request.method == "POST":
        form_data = request.get_json()  # フォームデータの受け取り
        if not isTextLength(form_data["text"]):
            return jsonify({"success":False, "message": "入力にエラーがあります"})
        if hakidasiValidator(form_data["text"]):
            return jsonify({"success":False, "message": "入力にエラーがあります"})
        # ネガポジ判定
        classificator.classification(form_data["text"])
        
        
        #try:
        thing = Things(
            user_id = USER_ID,
            things = form_data["text"],
            total = round(classificator.positive - classificator.negative, 2),
            is_active = True
        )
        db.session.add(thing)
        db.session.commit()
        point = Points(
            thing_id = thing.id,
            positive = classificator.positive,
            negative = classificator.negative,
        )
        db.session.add(point)
        db.session.commit()
        # except:
        #     return jsonify({"success":False, "message": "エラーが発生しました"})
        return jsonify({"success": True, "message": "データを記録しました"})
    return jsonify({"success": False, "message":"Can not this method."})

@app.route("/api/get_data/<key>", methods=["GET"])
def get_data(key):
    if request.method == "GET":
        print("get_data function...")
        items = None
        tschema = ThingsSchema(many=True)
        if key != "all":
            pass
        else:
            items = Things.query.filter_by(user_id=USER_ID, is_active=True).order_by(Things.updated_at.desc()).all()
        return jsonify({"items": tschema.dump(items), "message": "send items."})
    return jsonify({"items": None, "message": "Can not this method."})

@app.route("/", defaults={"path":""})
@app.route("/<path:path>")
def index(path):
    return render_template("index.html")
