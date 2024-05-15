import React, { useState, useEffect } from "react";
import "./ShoppingCart.css";
import { Empty } from "antd";
import { Divider, List, Typography } from "antd";
import donutsImg from "./donuts.png";
import chickenImg from "./chicken.webp";
import pizzaImg from "./pizza.avif";
import icecreamImg from "./icecream.jpg";
import cokeImg from "./coke.webp";
import steakImg from "./steak.png";
import friedRiceCakeImg from "./friedRiceCake.jpg";
import lobsterImg from "./lobster.jpeg";
import greenTeaImg from "./greenTea.jpg";
import bubbleTeaImg from "./bubbleTea.png";
import blackTeaImg from "./blackTea.jpg";
import honeyImg from "./honey.png";
import marshmallowImg from "./marshmallow.jpg";
import chocolateImg from "./chocolate.jpg";
import specialImg from "./special.png";

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

  const foodEmpty = (num) => {
    if (cartEmpty[num] != 0) {
      return cartEmpty[num];
    }
    else {
      return 0;
    }
  };

  // // food data
  // let foodData = ["烤雞\t:\t", "披薩\t:\t", "牛排\t:\t", "年糕\t:\t", "龍蝦\t:\t"];
  // // foodData[0].join(" ");
  // // drink data
  // let drinkData = ["可樂\t:\t", "綠茶\t:\t", "珍奶\t:\t", "紅茶\t:\t", "蜂蜜\t:\t"];
  // // dessert data
  // let dessertData = ["甜甜圈\t:\t", "冰淇淋\t:\t", "棉花糖\t:\t", "巧克力\t:\t", "特別甜點\t:\t"];
  // if (cartEmpty) {
  //   // food data number
  //   for (let i = 0; i < 5; i++) {
  //     foodData[i] = foodData[i] + cartEmpty[i + 1] + " 份";
  //   }
  //   // drink data number
  //   for (let i = 0; i < 5; i++) {
  //     drinkData[i] = drinkData[i] + cartEmpty[i + 6] + " 杯";
  //   }
  //   // dessert data number
  //   for (let i = 0; i < 5; i++) {
  //     dessertData[i] = dessertData[i] + cartEmpty[i + 11]+ " 份";
  //   }
  // }

  return (
    <div id="shopping-cart-full-component">
      <div id="shopping-cart-component">
        {isCartEmpty() ? (
          // if no cart in this username, show empty icon
          <Empty />
        ) : (
          // else, show cart
          <div id="shopping-cart-title-component">
            <h1 id="shopping-cart-title">購物車內容 :</h1>
            <div id="shopping-cart-data-component">

              {/* 購物車內容 */}
              {/* 第一版 */}
              {/* <div className="shopping-cart-data">
              <>
                <Divider orientation="left"></Divider>
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
            </div> */}
              {/* 第二版 */}
              <div className="shopping-cart-data">
                <h1 className="shopping-cart-food-title">食物 : </h1>
                <div>
                  {foodEmpty(1) ? (
                    <div className="food-component">
                      <img className="img" src={chickenImg}></img>
                      <h2 className="food-name-2">烤雞 : {cartEmpty[1]} 份</h2>
                    </div>
                  ) : (<p></p>)}
                  {foodEmpty(2) ? (
                    <div className="food-component">
                      <img className="img" src={pizzaImg}></img>
                      <h2 className="food-name-2">披薩 : {cartEmpty[2]} 份</h2>
                    </div>
                  ) : (<p></p>)}
                  {foodEmpty(3) ? (
                    <div>
                      <div className="food-component">
                        <img className="img" src={steakImg}></img>
                        <h2 className="food-name-2">牛排 : {cartEmpty[3]} 份</h2>
                      </div>
                    </div>
                  ) : (<p></p>)}
                  {foodEmpty(4) ? (
                    <div>
                      <div className="food-component">
                        <img className="img" src={friedRiceCakeImg}></img>
                        <h2 className="food-name-4">辣炒年糕 : {cartEmpty[4]} 份</h2>
                      </div>
                    </div>
                  ) : (<p></p>)}
                  {foodEmpty(5) ? (
                    <div>
                      <div className="food-component">
                        <img className="img" src={lobsterImg}></img>
                        <h2 className="food-name-2">龍蝦 : {cartEmpty[5]} 份</h2>
                      </div>
                    </div>
                  ) : (<p></p>)}
                </div>
              </div>
              <div className="shopping-cart-data">
                <h2 className="shopping-cart-food-title">飲料 : </h2>
                <div>
                  {foodEmpty(6) ? (
                    <div className="food-component">
                      <img className="img" src={cokeImg}></img>
                      <h2 className="food-name-4">可口可樂 : {cartEmpty[6]} 杯</h2>
                    </div>
                  ) : (<p></p>)}
                  {foodEmpty(7) ? (
                    <div className="food-component">
                      <img className="img" src={greenTeaImg}></img>
                      <h2 className="food-name-2">綠茶 : {cartEmpty[8]} 杯</h2>
                    </div>
                  ) : (<p></p>)}
                  {foodEmpty(8) ? (
                    <div>
                      <div className="food-component">
                        <img className="img" src={bubbleTeaImg}></img>
                        <h2 className="food-name-4">珍珠奶茶 : {cartEmpty[8]} 杯</h2>
                      </div>
                    </div>
                  ) : (<p></p>)}
                  {foodEmpty(9) ? (
                    <div>
                      <div className="food-component">
                        <img className="img" src={blackTeaImg}></img>
                        <h2 className="food-name-2">紅茶 : {cartEmpty[9]} 杯</h2>
                      </div>
                    </div>
                  ) : (<p></p>)}
                  {foodEmpty(10) ? (
                    <div>
                      <div className="food-component">
                        <img className="img" src={honeyImg}></img>
                        <h2 className="food-name-2">蜂蜜 : {cartEmpty[10]} 杯</h2>
                      </div>
                    </div>
                  ) : (<p></p>)}
                </div>
              </div>
              <div className="shopping-cart-data">
                <h2 className="shopping-cart-food-title">甜點 : </h2>
                <div>
                  {foodEmpty(11) ? (
                    <div className="food-component">
                      <img className="img" src={donutsImg}></img>
                      <h2 className="food-name-3">甜甜圈 : {cartEmpty[11]} 份</h2>
                    </div>
                  ) : (<p></p>)}
                  {foodEmpty(12) ? (
                    <div className="food-component">
                      <img className="img" src={icecreamImg}></img>
                      <h2 className="food-name-3">冰淇淋 : {cartEmpty[12]} 份</h2>
                    </div>
                  ) : (<p></p>)}
                  {foodEmpty(13) ? (
                    <div>
                      <div className="food-component">
                        <img className="img" src={marshmallowImg}></img>
                        <h2 className="food-name-3">棉花糖 : {cartEmpty[13]} 份</h2>
                      </div>
                    </div>
                  ) : (<p></p>)}
                  {foodEmpty(14) ? (
                    <div>
                      <div className="food-component">
                        <img className="img" src={chocolateImg}></img>
                        <h2 className="food-name-3">巧克力 : {cartEmpty[14]} 份</h2>
                      </div>
                    </div>
                  ) : (<p></p>)}
                  {foodEmpty(15) ? (
                    <div>
                      <div className="food-component">
                        <img className="img" src={specialImg}></img>
                        <h2 className="food-name-4">特別甜點 : {cartEmpty[15]} 份</h2>
                      </div>
                    </div>
                  ) : (<p></p>)}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ShoppingCart;
