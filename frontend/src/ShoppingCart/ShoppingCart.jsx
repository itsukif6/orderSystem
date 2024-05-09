import React, { useState, useEffect } from "react";
import "./ShoppingCart.css";
import { Empty } from "antd";
import { Divider, List, Typography } from "antd";

// header
let headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

function ShoppingCart() {
  // useState hook to manage cartEmpty state
  const [cartEmpty, setCartEmpty] = useState(null);

  useEffect(() => {
    fetchCartEmpty();
  }, []);

  const fetchCartEmpty = () => {
    fetch("http://localhost:5000/getCart")
      .then((response) => response.json())
      .then((data) => {
        setCartEmpty(data.data);
      })
      .catch((error) => {
        console.error("Error fetching cartEmpty:", error);
      });
  };

  const isCartEmpty = () => {
    if (cartEmpty === null || cartEmpty === undefined) {
      return true; // Cart is empty if it's null or undefined
    } else {
      return false; // Cart is not empty if it's any other value
    }
  };

  // food data
  let foodData = ["烤雞", "披薩", "牛排", "辣炒年糕", "龍蝦"];
  // drink data
  let drinkData = ["可口可樂", "綠茶", "珍珠奶茶", "紅茶", "蜂蜜"];
  // dessert data
  let dessertData = ["甜甜圈", "冰淇淋", "棉花糖", "巧克力", "特別甜點"];

  return (
    <div id="shopping-cart-full-component">
      <div id="shopping-cart-component">
        {isCartEmpty() ? (
          // if no cart in this username, show empty icon
          <Empty />
        ) : (
          // else, show cart
          <div id="shopping-cart-data-component">
            {/* 購物車內容 */}
            <div className="shopping-cart-data">
              <>
                <Divider orientation="left">購物車內容</Divider>
                <List
                  size="middle"
                  header={<div>食物 : </div>}
                  footer={<div></div>}
                  bordered
                  dataSource={foodData}
                  renderItem={(item) => <List.Item>{item}</List.Item>}
                />
              </>
            </div>
            <div className="shopping-cart-data">
              <>
                <Divider orientation="left"></Divider>
                <List
                  size="middle"
                  header={<div>飲料 :</div>}
                  footer={<div></div>}
                  bordered
                  dataSource={drinkData}
                  renderItem={(item) => <List.Item>{item}</List.Item>}
                />
              </>
            </div>
            <div className="shopping-cart-data">
              <>
                <Divider orientation="left"></Divider>
                <List
                  size="middle"
                  header={<div>甜點 :</div>}
                  footer={<div></div>}
                  bordered
                  dataSource={dessertData}
                  renderItem={(item) => <List.Item>{item}</List.Item>}
                />
              </>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ShoppingCart;
