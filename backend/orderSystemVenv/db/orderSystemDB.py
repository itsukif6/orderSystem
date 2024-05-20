import sqlite3

# test_dbfile = "backend\orderSystemVenv\db\orderSystemDB.db"
dbfile = "db\orderSystemDB.db"


class DB:
    def __init__(self):
        self.conn = sqlite3.connect(dbfile, check_same_thread=False)
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
            password_rows = self.cursor.execute(
                "SELECT password FROM UserData WHERE username = ?;", (inputUsername,)
            )
            for row in password_rows:
                if str(inputPassword) == row[0]:
                    print("Password found")
                    self.cursor.execute(
                        "UPDATE UserData SET loginstatus = 1 WHERE username = ? AND password = ?",
                        (inputUsername, inputPassword),
                    )
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
            if self.cursor.execute(
                "INSERT INTO UserData (username, password, loginstatus) VALUES (?, ?, ?);",
                (username, password, 0),
            ):
                self.conn.commit()
                return True
        except sqlite3.Error as e:
            print("Error:", e)
            return e

    # get login status
    # if login: return True
    # else: return False
    def checkLoginStatus(self, username):
        try:
            loginstatus = self.cursor.execute(
                "SELECT loginstatus FROM UserData WHERE username = ?;", (username,)
            )
            print(loginstatus)
            if loginstatus == 1:
                return True
            else:
                return False
        except sqlite3.Error as e:
            print("Error:", e)
            return e

    # new cart insert to DB
    def insertCartByNumberAndValue(
        self,
        username,
        chicken,
        pizza,
        steak,
        friedRiceCake,
        lobster,
        coke,
        greenTea,
        bubbleTea,
        blackTea,
        honey,
        donuts,
        icecream,
        marshmallow,
        chocolate,
        special,
        time,
    ):
        try:
            if self.cursor.execute(
                "SELECT username FROM UserData WHERE loginstatus = ?;", (1,)
            ):
                username = self.cursor.fetchone()[0]
                cart_data = self.cursor.execute(
                    "SELECT * FROM CartData WHERE username = ?;", (str(username),)
                )
                first_row = cart_data.fetchone()
                if first_row:  # Check if a row was found
                    print(first_row)
                    chicken = int(chicken) + int(first_row[1])
                    pizza = int(pizza) + int(first_row[2])
                    steak = int(steak) + int(first_row[3])
                    friedRiceCake = int(friedRiceCake) + int(first_row[4])
                    lobster = int(lobster) + int(first_row[5])
                    coke = int(coke) + int(first_row[6])
                    greenTea = int(greenTea) + int(first_row[7])
                    bubbleTea = int(bubbleTea) + int(first_row[8])
                    blackTea = int(blackTea) + int(first_row[9])
                    honey = int(honey) + int(first_row[10])
                    donuts = int(donuts) + int(first_row[11])
                    icecream = int(icecream) + int(first_row[12])
                    marshmallow = int(marshmallow) + int(first_row[13])
                    chocolate = int(chocolate) + int(first_row[14])
                    special = int(special) + int(first_row[15])
                    # if found, use update
                    if self.cursor.execute(
                        "UPDATE CartData SET username = ?, chicken = ?, pizza = ?, steak = ?, friedRiceCake = ?, lobster = ?, coke = ?, greenTea = ?, bubbleTea = ?, blackTea = ?, honey = ?, donuts = ?, icecream = ?, marshmallow = ?, chocolate = ?, special = ?, time = ? WHERE username = ?",
                        (
                            username,
                            chicken,
                            pizza,
                            steak,
                            friedRiceCake,
                            lobster,
                            coke,
                            greenTea,
                            bubbleTea,
                            blackTea,
                            honey,
                            donuts,
                            icecream,
                            marshmallow,
                            chocolate,
                            special,
                            time,
                            str(username),
                        ),
                    ):
                        self.conn.commit()
                        return True
                else:
                    # else use insert
                    print("No cart data found for username:", username)
                    if self.cursor.execute(
                        "INSERT INTO CartData (username, chicken, pizza, steak, friedRiceCake, lobster, coke, greenTea, bubbleTea, blackTea, honey, donuts, icecream, marshmallow, chocolate, special, time) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
                        (
                            username,
                            chicken,
                            pizza,
                            steak,
                            friedRiceCake,
                            lobster,
                            coke,
                            greenTea,
                            bubbleTea,
                            blackTea,
                            honey,
                            donuts,
                            icecream,
                            marshmallow,
                            chocolate,
                            special,
                            time,
                        ),
                    ):
                        print("insert successfully")
                        self.conn.commit()
                        return True
        except sqlite3.Error as e:
            print("Error:", e)
            return e

    # get username with login status
    def getLoginUsername(self):
        try:
            self.cursor.execute(
                "SELECT username FROM UserData WHERE loginstatus = ?;", (1,)
            )
            username = self.cursor.fetchone()  # Fetch the username
            if username is not None:
                username = username[0]  # Extract the username from the tuple
                return username
            else:
                return False
        except sqlite3.Error as e:
            print("Error:", e)
            return e

    # get cart exist with username
    def getCartEmpty(self):
        try:
            # Fetch username as a string
            self.cursor.execute(
                "SELECT username FROM UserData WHERE loginstatus = ?;", (1,)
            )
            username = self.cursor.fetchone()[0]  # Get first username

            # Bind username as a string parameter
            cart_data = self.cursor.execute(
                "SELECT * FROM CartData WHERE username = ?;", (str(username),)
            )
            first_row = cart_data.fetchone()
            if first_row:  # Check if a row was found
                return first_row  # Access data using tuple indexing (e.g., first_row[0] for first column)
            else:
                print("No cart data found for username:", username)

        except sqlite3.Error as e:
            print("Error:", e)
            return e

    # logout with username
    def logout(self):
        try:
            # Fetch username as a string
            self.cursor.execute(
                "SELECT username FROM UserData WHERE loginstatus = ?;", (1,)
            )
            username = self.cursor.fetchone()[0]  # Get first username

            self.cursor.execute(
                "UPDATE UserData SET loginstatus = 0 WHERE username = ?;",
                (username,),
            )
            self.conn.commit()
            return True

        except sqlite3.Error as e:
            print("Error:", e)
            return e

    # send order: delete shopping cart data and insert order data to order table
    def sendOrder(self):
        try:
            # Fetch username as a string
            self.cursor.execute(
                "SELECT username FROM UserData WHERE loginstatus = ?;", (1,)
            )
            username = self.cursor.fetchone()[0]  # Get first username

            # Get shopping cart data
            cart_data = self.cursor.execute(
                "SELECT * FROM CartData WHERE username = ?;", (str(username),)
            )
            first_row = cart_data.fetchone()

            # price
            price = 0
            for i in range(1, 16):
                if i <= 5:
                    price += (int(first_row[i])*199)
                elif i <= 10:
                    price += (int(first_row[i])*30)
                else:
                    price += (int(first_row[i])*49)
            
            # Insert Order Data and delete shopping cart data
            if self.cursor.execute(
                "INSERT INTO OrderData (username, chicken, pizza, steak, friedRiceCake, lobster, coke, greenTea, bubbleTea, blackTea, honey, donuts, icecream, marshmallow, chocolate, special, time, price) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
                (
                    first_row[0],
                    first_row[1],
                    first_row[2],
                    first_row[3],
                    first_row[4],
                    first_row[5],
                    first_row[6],
                    first_row[7],
                    first_row[8],
                    first_row[9],
                    first_row[10],
                    first_row[11],
                    first_row[12],
                    first_row[13],
                    first_row[14],
                    first_row[15],
                    first_row[16],
                    str(price)
                ),
            ) and self.cursor.execute(
                "DELETE FROM CartData WHERE username = ?;", (str(username),)
            ):
                print("insert into orderData and delete CartData successfully!")
                self.conn.commit()
                return True

        except sqlite3.Error as e:
            print("Error:", e)
            return e

    # get order data
    def getOrderData(self):
        try:
            # Fetch username as a string
            self.cursor.execute(
                "SELECT username FROM UserData WHERE loginstatus = ?;", (1,)
            )
            username = self.cursor.fetchone()[0]  # Get first username

            # Bind username as a string parameter
            order_data = self.cursor.execute(
                "SELECT * FROM OrderData WHERE username = ?;", (str(username),)
            )
            first_row = order_data.fetchone()
            if first_row:  # Check if a row was found
                return first_row  # Access data using tuple indexing (e.g., first_row[0] for first column)
            else:
                print("No order data found for username:", username)

        except sqlite3.Error as e:
            print("Error:", e)
            return e

    # get Price
    def getPrice(self):
        try:
            # Fetch username as a string
            self.cursor.execute(
                "SELECT username FROM UserData WHERE loginstatus = ?;", (1,)
            )
            username = self.cursor.fetchone()[0]  # Get first username

            # Bind username as a string parameter
            order_data = self.cursor.execute(
                "SELECT * FROM OrderData WHERE username = ?;", (str(username),)
            )
            first_row = order_data.fetchone()
            if first_row:  # Check if a row was found
                return first_row[17]  # Access Price using tuple indexing (e.g., first_row[0] for first column)
            else:
                print("No order data found for username:", username)

        except sqlite3.Error as e:
            print("Error:", e)
            return e

    # insert delivery status
    def insertDeliveryStatus(self):
        try:
            # Fetch username as a string
            self.cursor.execute(
                "SELECT username FROM UserData WHERE loginstatus = ?;", (1,)
            )
            username = self.cursor.fetchone()[0]  # Get username

            # Fetch time as a string
            self.cursor.execute(
                "SELECT time FROM OrderData WHERE username = ?;", (username,)
            )
            time = self.cursor.fetchone()[0]  # Get time

            # insert delivery status
            if self.cursor.execute(
                "INSERT INTO DeliveryData (username, status, time) VALUES (?, ?, ?);",
                (
                    username,
                    1,
                    time,
                ),
            ):
                print("order receive successfully!")
                self.conn.commit()
                return True

        except sqlite3.Error as e:
            print("Error:", e)
            return e
        
    # get delivery status
    def getDeliveryStatus(self):
        try:
            # Fetch username as a string
            self.cursor.execute(
                "SELECT username FROM UserData WHERE loginstatus = ?;", (1,)
            )
            username = self.cursor.fetchone()[0]  # Get username

            # Fetch status as a string
            self.cursor.execute(
                "SELECT * FROM DeliveryData WHERE username = ?;", (username,)
            )
            status = self.cursor.fetchone()[1]  # Get status
            return str(status)

        except sqlite3.Error as e:
            print("Error:", e)
            return e

    # update delivery status
    def updateDeliveryStatus(self, status):
        try:
            # Fetch username as a string
            self.cursor.execute(
                "SELECT username FROM UserData WHERE loginstatus = ?;", (1,)
            )
            username = self.cursor.fetchone()[0]  # Get username

            # Fetch time as a string
            self.cursor.execute(
                "SELECT time FROM OrderData WHERE username = ?;", (username,)
            )
            time = self.cursor.fetchone()[0]  # Get time

            # update delivery status
            if self.cursor.execute(
                "UPDATE DeliveryData SET status = ? WHERE username = ?;",
                (status, username,),
            ):
                print(f"update order status to {status} successfully!")
                self.conn.commit()
            
            # if delivery finished successfully, delete order data
            if status == 2:
                self.cursor.execute(
                    "DELETE FROM OrderData WHERE time = ?;", (str(time),)
                )
                self.conn.commit()
                return True
            else:
                return True
        except sqlite3.Error as e:
            print("Error:", e)
            return e


# test DB methods
if __name__ == "__main__":
    db = DB()
    print(db.sendOrder())
