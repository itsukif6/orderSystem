import sys
sys.path.append("./db")

from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from db.orderSystemDB import DB
db = DB()
app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return "Hello World!"

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == "POST":
        data = request.json
        username = data.get("username")
        password = data.get("password")
        print(username, password)
        if db.searchUsername(str(username)) == True:
            if db.checkPassword(username, password) == True:
                print("Welcome")
                return ("true")
            else:
                print("Wrong password")
                return ("false")
        else:
            print("Wrong account")
            return ("false")
    db.close_connection()

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == "POST":
        data = request.json
        username = data.get("username")
        password = data.get("password")
        print(username, password)
        searchUsernameReturn = db.searchUsername(str(username))
        if searchUsernameReturn == False:
            if db.insertUsernameAndPassword(str(username),str(password)) == True:
                return("true")
        else:
            return("false")
    db.close_connection()
        
@app.route('/menu', methods=['GET', 'POST'])
def menu():
    if request.method == "POST":   
        data = request.json
        username = data.get("username")
        value = data.get("value")
        print(username, value)
        if db.insertOrderByNumberAndValue(username, value[0], value[1], value[2], value[3], value[4], value[5], value[6], value[7], value[8], value[9], value[10], value[11], value[12], value[13], value[14]):
            return("true")    
        else: 
            return("false") 

# get username from DB with login status
@app.route('/getUsername', methods=['GET'])
def getUsername():
    if request.method == "GET":
        username = db.getLoginUsername()
        if username:
            return jsonify({"username": username})
        else:
            return jsonify({"error": "Username not found"}), 404


if __name__ == '__main__':
    app.run(debug=True)