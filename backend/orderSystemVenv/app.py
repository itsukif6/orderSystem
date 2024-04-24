import sys
sys.path.append("./db")

from flask import Flask, render_template, request
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
        print(data)
        return("true")     

if __name__ == '__main__':
    app.run(debug=True)