import React, { useState, useEffect } from "react";
import "./ShoppingCart.css";
import { Empty } from "antd";

function ShoppingCart() {
  // get username
  const [username, setUsername] = useState(null);
  const fetchUsername = () => {
    fetch("http://localhost:5000/getUsername")
      .then((response) => response.json())
      .then((data) => {
        setUsername(data.username);
      })
      .catch((error) => {
        console.error("Error fetching username:", error);
      });
  };

  // cart empty?
  const [cartEmpty, setCartEmpty] = useState(null);
  const getCart = () => {
    fetch("http://localhost:5000/getCart")
      .then((response) => response.json())
      .then((data) => {
        setCartEmpty(data.cartEmpty);
      })
      .catch((error) => {
        console.error("Error fetching username:", error);
      });
  };

  // 頁面載入時就去請求資料
  useEffect(() => {
    fetchUsername();
  }, []);
  // 頁面載入時就去請求資料
  useEffect(() => {
    getCart();
  }, []);

  const isCartEmpty = () => {
    if (cartEmpty) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <div id="shopping-cart-full-component">
      <div id="shopping-cart-component">
        {isCartEmpty ? (
          <Empty />
        ) : (
          <div>
            <h1>訂單資訊</h1>
            {/* 其他購物車內容 */}
          </div>
        )}
      </div>
    </div>
  );
}

export default ShoppingCart;
