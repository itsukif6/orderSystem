import React, { useState, useEffect } from "react";
import "./ShoppingCart.css";
import { Empty } from "antd";
// import { Divider, List, Typography } from "antd";
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
// import backImg from "./back.jpg";

import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";

// header
// let headers = {
//   "Content-Type": "application/json",
//   Accept: "application/json",
// };
const items = [
  {
    key: "sub01",
    label: "Contact",
    icon: <MailOutlined />,
    children: [
      {
        key: "g1",
        label: "Web Developer",
        type: "group",
        children: [
          {
            key: "11",
            label: "GitHub",
          },
          {
            key: "12",
            label: "Gmail",
          },
        ],
      },
      {
        key: "g2",
        label: "Restaurant Owner",
        type: "group",
        children: [
          {
            key: "13",
            label: "Gmail",
          },
        ],
      },
    ],
  },
  {
    key: "sub02",
    label: "Pages",
    icon: <AppstoreOutlined />,
    children: [
      {
        key: "21",
        label: "Welcome",
      },
      {
        key: "22",
        label: "Log In",
      },
      {
        key: "23",
        label: "Menu",
      },
      {
        key: "24",
        label: "Shopping Cart",
      },
      {
        key: "25",
        label: "Order Info",
      },
      {
        key: "26",
        label: "Order Track",
      },
    ],
  },
  {
    type: "divider",
  },
  {
    key: "sub03",
    label: "Setting",
    icon: <SettingOutlined />,
    children: [
      {
        key: "31",
        label: "Log Out",
      },
    ],
  },
];
function ShoppingCart() {
  // useState hook to manage cartEmpty state
  const [cartEmpty, setCartEmpty] = useState(null);

  useEffect(() => {
    fetchCartEmpty();
    // title
    document.title = "Shopping Cart";
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
    if (cartEmpty[num] !== "0") {
      return cartEmpty[num];
    } else {
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

  // logout
  const logout = () => {
    // logout GET request using fetch
    fetch("http://localhost:5000/logOut")
      .then((response) => response.json())
      .then((data) => this.setState({ totalReactPackages: data.total }));
  };

  // send request
  const sendOrder = () => {
    // send Order
    fetch("http://localhost:5000/sendOrder")
      .then((response) => response.json())
      .then((data) => {
        if (data !== "true") {
          console.log(data);
        } else {
          console.log(data);
        }
      })
      .catch((e) => {
        console.log(e);
      });

    // insert Delivery Status
    fetch("http://localhost:5000/insertDeliveryStatus")
      .then((response) => response.json())
      .then((data) => {
        if (data !== "true") {
          console.log(data);
        } else {
          console.log(data);
        }
      })
      .catch((e) => {
        console.log(e);
      });

    window.location.assign("http://localhost:3000/Order");
  };

  //get total price
  const getPrice = () => {
    var i,
      totalPrice = 0;
    if (cartEmpty) {
      for (i = 1; i < 16; i++) {
        // food
        if (i <= 5) {
          totalPrice += cartEmpty[i] * 199;
        }
        // drink
        else if (i <= 10) {
          totalPrice += cartEmpty[i] * 30;
        }
        // dessert
        else if (i <= 15) {
          totalPrice += cartEmpty[i] * 49;
        }
      }
    }
    return totalPrice;
  };

  // back To Menu
  const backToMenu = () => {
    window.location.assign("http://localhost:3000/Menu");
  };

  // onClickMenu API
  const onClickMenu = (e) => {
    // click items component links
    console.log("click ", e);
    if (e.key === "11") {
      // github API
      window.open(
        "https://github.com/itsukif6",
        "_blank",
        "width=1200,height=800"
      );
    } else if (e.key === "12") {
      // developer gmail API
      window.open(
        "https://mail.google.com/mail/u/0/?hl=zh-TW#inbox?compose=DmwnWrRlQQMQvfXBMvcxvHpDlgNdsDzJqzRpSTmgjPjzRdKFfGWcnJvhksBPPrZtKqcmnjqjWjCv",
        "_blank",
        "width=1200,height=800"
      );
    } else if (e.key === "13") {
      // owner gmail API
      window.open(
        "https://mail.google.com/mail/u/0/?hl=zh-TW#inbox?compose=DmwnWrRlQQMQvfXBMvcxvHpDlgNdsDzJqzRpSTmgjPjzRdKFfGWcnJvhksBPPrZtKqcmnjqjWjCv",
        "_blank",
        "width=1200,height=800"
      );
    } else if (e.key === "21") {
      // root API
      window.location.assign("http://localhost:3000");
    } else if (e.key === "22") {
      // login API
      window.location.assign("http://localhost:3000/Login");
    } else if (e.key === "23") {
      // menu API
      window.location.assign("http://localhost:3000/Menu");
    } else if (e.key === "24") {
      // order API
      window.location.assign("http://localhost:3000/ShoppingCart");
    } else if (e.key === "25") {
      // shopping cart API
      window.location.assign("http://localhost:3000/Order");
    } else if (e.key === "26") {
      // order track API
      window.location.assign("http://localhost:3000/Track");
    } else if (e.key === "31") {
      // log Out
      logout();
      window.location.assign("http://localhost:3000/Login");
    }
  };

  return (
    <div id="shopping-cart-full-component">
      {/* menu div */}
      <div id="menu">
        <Menu
          onClick={onClickMenu}
          style={{
            width: 170,
          }}
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          items={items}
        />
      </div>
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
                {/* 若食物不為空才顯示 */}
                {foodEmpty(1) !== 0 ||
                foodEmpty(2) !== 0 ||
                foodEmpty(3) !== 0 ||
                foodEmpty(4) !== 0 ||
                foodEmpty(5) !== 0 ? (
                  <>
                    <h1 className="shopping-cart-food-title">主食 : </h1>
                    <div>
                      {foodEmpty(1) ? (
                        <div className="food-component">
                          <img
                            className="img"
                            src={chickenImg}
                            alt="chickenImg"
                          ></img>
                          <h2 className="food-name-2">
                            烤雞 : {cartEmpty[1]} 份
                          </h2>
                        </div>
                      ) : (
                        <p></p>
                      )}
                      {foodEmpty(2) ? (
                        <div className="food-component">
                          <img
                            className="img"
                            src={pizzaImg}
                            alt="pizzaImg"
                          ></img>
                          <h2 className="food-name-2">
                            披薩 : {cartEmpty[2]} 份
                          </h2>
                        </div>
                      ) : (
                        <p></p>
                      )}
                      {foodEmpty(3) ? (
                        <div>
                          <div className="food-component">
                            <img
                              className="img"
                              src={steakImg}
                              alt="steakImg"
                            ></img>
                            <h2 className="food-name-2">
                              牛排 : {cartEmpty[3]} 份
                            </h2>
                          </div>
                        </div>
                      ) : (
                        <p></p>
                      )}
                      {foodEmpty(4) ? (
                        <div>
                          <div className="food-component">
                            <img
                              className="img"
                              src={friedRiceCakeImg}
                              alt="friedRiceCakeImg"
                            ></img>
                            <h2 className="food-name-4">
                              辣炒年糕 : {cartEmpty[4]} 份
                            </h2>
                          </div>
                        </div>
                      ) : (
                        <p></p>
                      )}
                      {foodEmpty(5) ? (
                        <div>
                          <div className="food-component">
                            <img
                              className="img"
                              src={lobsterImg}
                              alt="lobsterImg"
                            ></img>
                            <h2 className="food-name-2">
                              龍蝦 : {cartEmpty[5]} 份
                            </h2>
                          </div>
                        </div>
                      ) : (
                        <p></p>
                      )}
                    </div>
                  </>
                ) : (
                  <p></p>
                )}
              </div>
              <div className="shopping-cart-data">
                {/* 若飲料不為空才顯示 */}
                {foodEmpty(6) !== 0 ||
                foodEmpty(7) !== 0 ||
                foodEmpty(8) !== 0 ||
                foodEmpty(9) !== 0 ||
                foodEmpty(10) !== 0 ? (
                  <>
                    <h1 className="shopping-cart-food-title">飲料 : </h1>
                    <div>
                      {foodEmpty(6) ? (
                        <div className="food-component">
                          <img
                            className="img"
                            src={cokeImg}
                            alt="cokeImg"
                          ></img>
                          <h2 className="food-name-4">
                            可口可樂 : {cartEmpty[6]} 杯
                          </h2>
                        </div>
                      ) : (
                        <p></p>
                      )}
                      {foodEmpty(7) ? (
                        <div className="food-component">
                          <img
                            className="img"
                            src={greenTeaImg}
                            alt="greenTeaImg"
                          ></img>
                          <h2 className="food-name-2">
                            綠茶 : {cartEmpty[7]} 杯
                          </h2>
                        </div>
                      ) : (
                        <p></p>
                      )}
                      {foodEmpty(8) ? (
                        <div>
                          <div className="food-component">
                            <img
                              className="img"
                              src={bubbleTeaImg}
                              alt="bubbleTeaImg"
                            ></img>
                            <h2 className="food-name-4">
                              珍珠奶茶 : {cartEmpty[8]} 杯
                            </h2>
                          </div>
                        </div>
                      ) : (
                        <p></p>
                      )}
                      {foodEmpty(9) ? (
                        <div>
                          <div className="food-component">
                            <img
                              className="img"
                              src={blackTeaImg}
                              alt="blackTeaImg"
                            ></img>
                            <h2 className="food-name-2">
                              紅茶 : {cartEmpty[9]} 杯
                            </h2>
                          </div>
                        </div>
                      ) : (
                        <p></p>
                      )}
                      {foodEmpty(10) ? (
                        <div>
                          <div className="food-component">
                            <img
                              className="img"
                              src={honeyImg}
                              alt="honeyImg"
                            ></img>
                            <h2 className="food-name-2">
                              蜂蜜 : {cartEmpty[10]} 杯
                            </h2>
                          </div>
                        </div>
                      ) : (
                        <p></p>
                      )}
                    </div>
                  </>
                ) : (
                  <p></p>
                )}
              </div>
              <div className="shopping-cart-data">
                {/* 若甜點不為空才顯示 */}
                {foodEmpty(11) !== 0 ||
                foodEmpty(12) !== 0 ||
                foodEmpty(13) !== 0 ||
                foodEmpty(14) !== 0 ||
                foodEmpty(15) !== 0 ? (
                  <>
                    <h1 className="shopping-cart-food-title">甜點 : </h1>
                    <div>
                      {foodEmpty(11) ? (
                        <div className="food-component">
                          <img
                            className="img"
                            src={donutsImg}
                            alt="donutsImg"
                          ></img>
                          <h2 className="food-name-3">
                            甜甜圈 : {cartEmpty[11]} 份
                          </h2>
                        </div>
                      ) : (
                        <p></p>
                      )}
                      {foodEmpty(12) ? (
                        <div className="food-component">
                          <img
                            className="img"
                            src={icecreamImg}
                            alt="icecreamImg"
                          ></img>
                          <h2 className="food-name-3">
                            冰淇淋 : {cartEmpty[12]} 份
                          </h2>
                        </div>
                      ) : (
                        <p></p>
                      )}
                      {foodEmpty(13) ? (
                        <div>
                          <div className="food-component">
                            <img
                              className="img"
                              src={marshmallowImg}
                              alt="marshmallowImg"
                            ></img>
                            <h2 className="food-name-3">
                              棉花糖 : {cartEmpty[13]} 份
                            </h2>
                          </div>
                        </div>
                      ) : (
                        <p></p>
                      )}
                      {foodEmpty(14) ? (
                        <div>
                          <div className="food-component">
                            <img
                              className="img"
                              src={chocolateImg}
                              alt="chocolateImg"
                            ></img>
                            <h2 className="food-name-3">
                              巧克力 : {cartEmpty[14]} 份
                            </h2>
                          </div>
                        </div>
                      ) : (
                        <p></p>
                      )}
                      {foodEmpty(15) ? (
                        <div>
                          <div className="food-component">
                            <img
                              className="img"
                              src={specialImg}
                              alt="specialImg"
                            ></img>
                            <h2 className="food-name-4">
                              特別甜點 : {cartEmpty[15]} 份
                            </h2>
                          </div>
                        </div>
                      ) : (
                        <p></p>
                      )}
                    </div>
                  </>
                ) : (
                  <p></p>
                )}
              </div>
            </div>
            <button className="send-order-button" onClick={sendOrder}>
              送出訂單
            </button>
          </div>
        )}
        <div id="price-text">
          <h2>總金額: {getPrice()}元</h2>
        </div>
        <div>
          <button id="back-to-menu" onClick={backToMenu}></button>
          {/* <h id="back-to-menu-text">返回菜單頁面</h> */}
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
