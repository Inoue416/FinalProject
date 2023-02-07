from app import app
from flask import render_template, request, jsonify

@app.route("/api/login", methods=["POST"])
def login():
    if request.method == "POST":
        print(request.get_json())
        return jsonify({"message":"OK"})
    return jsonify({"message":"NG"})

@app.route("/api/registor", methods=["POST"])
def registor():
    if request.method == "POST":
        print(request.get_json())
        return jsonify({"message":"OK"})
    return jsonify({"message":"NG"})

@app.route("/", defaults={"path":""})
@app.route("/<path:path>")
def index(path):
    return render_template("index.html")
