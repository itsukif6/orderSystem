import sys
sys.path.append("./db")

from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from db.orderSystemDB import DB
db = DB()
app = Flask(__name__)
CORS(app)

from flask_mail import Mail, Message

app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USERNAME'] = 's2mplenote.nknu@gmail.com'  # Use your actual Gmail address
app.config['MAIL_PASSWORD'] = 'fkfs igrw bjxz yzkj'     # Use your generated App Password
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
mail = Mail(app)

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
    
# get order from DB with login status
@app.route('/getOrder', methods=['GET'])
def getOrder():
    if request.method == "GET":
        orderData = db.getOrderData()
        if orderData:
            return jsonify(orderData)  # Return JSON response
        else:
            return jsonify("false"), 404
        
# get order from DB with login status
@app.route('/getPrice', methods=['GET'])
def getPrice():
    # if request.method == "GET":
    price = db.getPrice()
    if price:
        print(price)
        return (str(price))
    else:
        return ("false")
        
# insert Delivery status
@app.route('/insertDeliveryStatus', methods=['GET'])
def insertDeliveryStatus():
    if request.method == "GET":
        isDeliverySet = db.insertDeliveryStatus()
        if isDeliverySet:
            return ("true")
        else:
            return ("false")
        
# get Delivery status
@app.route('/getDeliveryStatus', methods=['GET'])
def getDeliveryStatus():
    if request.method == "GET":
        status = db.getDeliveryStatus()
        if status:
            return (str(status))
        else:
            return ("false")
        
# update Delivery status
@app.route('/updateDeliveryStatus', methods=['GET', 'POST'])
def updateDeliveryStatus():
    if request.method == "POST":
        data = request.json
        value = data.get("value")
        isDeliveryUpdate = db.updateDeliveryStatus(value)
        print(value)
        if isDeliveryUpdate:
            return ("true")
        else:
            return ("false")

# update Delivery status
@app.route('/deleteDelivery', methods=['GET'])
def deleteDelivery():
    if request.method == "GET":
        isDeliveryUpdate = db.deleteDelivery()
        if isDeliveryUpdate:
            return ("true")
        else:
            return ("false")
        
@app.route("/email", methods=['POST'])
def email():
    if request.method == "POST":
        data = request.json
        user_email = data.get("user_email")
        username = data.get("username")
        user_password = db.getPassword(username)
        if user_password != False:
            # print(user_email, username, user_password)
            msg = Message(
                subject='Your Password!', 
                sender='s2mplenote.nknu@gmail.com',  # Ensure this matches MAIL_USERNAME
                recipients=[user_email]  # Replace with actual recipient's email
            )
            msg.body = "Your Password is "+user_password+"!"
            mail.send(msg)
            return jsonify({"user_password": user_password})
        else:
            return jsonify("false")
        
if __name__ == '__main__':
    app.run(debug=True)