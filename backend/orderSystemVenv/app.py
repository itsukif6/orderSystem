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
        import datetime
        now = datetime.datetime.now()

        data = request.json
        username = data.get("username")
        value = data.get("value")
        
        nullOrder = True
        for i in value:
            if i != '0':
                nullOrder = False

        if nullOrder == True:
            print("order is null")
            print(username, value)
            return("false") 
        
        elif nullOrder == False:
            print(username, value)
            if db.insertCartByNumberAndValue(username, value[0], value[1], value[2], value[3], value[4], value[5], value[6], value[7], value[8], value[9], value[10], value[11], value[12], value[13], value[14], now):
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

# get username from DB with login status
@app.route('/getCart', methods=['GET'])
def getCart():
    if request.method == "GET":
        data = db.getCartEmpty()
        if data:
            print(data)
            return jsonify({"data": data})  
        else:
            return jsonify({"error": "Cart empty"}), 404
        
# get username from DB with login status
@app.route('/logOut', methods=['GET'])
def logOut():
    if request.method == "GET":
        islogout = db.logout()
        if islogout:
            return ("true")
        else:
            return ("false")

# send Order: delete cart data and insert into order table
@app.route('/sendOrder', methods=['GET'])
def sendOrder():
    if request.method == "GET":
        isOrderSended = db.sendOrder()
        if isOrderSended:
            return ("true")
        else:
            return ("false")
    
if __name__ == '__main__':
    app.run(debug=True)