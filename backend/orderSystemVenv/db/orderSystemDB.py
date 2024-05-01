import sqlite3
test_dbfile = "orderSystemVenv\db\orderSystemDB.db"
dbfile = "db\orderSystemDB.db"

class DB():
    def __init__(self):
        self.conn = sqlite3.connect(dbfile,check_same_thread=False)
        self.cursor = self.conn.cursor()
        
    def close_connection(self):
        # 關閉游標和資料庫連接
        self.cursor.close()
        self.conn.close()
        
    # search for username
    def searchUsername(self, inputUsername):
        try:
            username_rows = self.cursor.execute("SELECT username FROM UserData;")
            for row in username_rows:
                for field in row:
                    if inputUsername == field:
                        print("Username found")
                        return True
            print("Username not found")
            return False
        except sqlite3.Error as e:
            print(e)
            return e
        
    # check for password
    def checkPassword(self, inputUsername, inputPassword):
        try:
            password_rows = self.cursor.execute("SELECT password FROM UserData WHERE username = ?;", (inputUsername,))
            for row in password_rows:
                if str(inputPassword) == row[0]:
                    print("Password found")
                    self.cursor.execute("UPDATE UserData SET loginstatus = 1 WHERE username = ? AND password = ?", (inputUsername, inputPassword))
                    self.conn.commit()
                    return True
            print("Password not found")
            return False
        except sqlite3.Error as e:
            print(e)
            return e
        
    # create new account
    def insertUsernameAndPassword(self, username, password):
        try:
            if self.cursor.execute("INSERT INTO UserData (username, password, loginstatus) VALUES (?, ?, ?);", (username, password, 0)):
                self.conn.commit()
                return True
        except sqlite3.Error as e:
            print("Error:",e)
            return e

    # get login status
    # if login: return True
    # else: return False
    def checkLoginStatus(self, username):
        try:
            loginstatus =  self.cursor.execute("SELECT loginstatus FROM UserData WHERE username = ?;", (username,))
            print(loginstatus)
            if loginstatus == 1:
                return True
            else: 
                return False
        except sqlite3.Error as e:
            print("Error:",e)
            return e
        
    # new order insert to DB
    def insertOrderByNumberAndValue(self, username, chicken, pizza, steak, friedRiceCake, lobster, coke, greenTea, bubbleTea, blackTea, honey, donuts, icecream, marshmallow, chocolate, special):
        try:
            if self.cursor.execute("INSERT INTO OrderData (username, chicken, pizza, steak, friedRiceCake, lobster, coke, greenTea, bubbleTea, blackTea, honey, donuts, icecream, marshmallow, chocolate, special) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);", (username, chicken, pizza, steak, friedRiceCake, lobster, coke, greenTea, bubbleTea, blackTea, honey, donuts, icecream, marshmallow, chocolate, special)):
                self.conn.commit()
                return True
        except sqlite3.Error as e:
            print("Error:",e)
            return e