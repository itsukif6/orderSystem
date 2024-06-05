import React, { useState, useEffect } from "react";
import "./Menu.css";
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
import { useRef } from "react";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";

let headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

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
        key: "32",
        label: "Staff",
      },
      {
        key: "31",
        label: "Log Out",
      },
    ],
  },
];

// document.addEventListener('DOMContentLoaded', function () {
//   const showInfoButton = document.getElementById('showInfoButton');
//   const foodImgContainer = document.getElementById('foodImgContainer');
//   console.log("showInfoButton", showInfoButton, foodImgContainer);
//   showInfoButton?.addEventListener('click', function () {

//     foodImgContainer?.classList.toggle('.show-info');
//   });
// });

function OrderMenu() {
  const ref = useRef({});

  // get username from DB with login status
  const [username, setUsername] = useState(null);

  useEffect(() => {
    fetchUsername();
    // title
    document.title = "Menu";
  }, []);

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

  const pushRef = (el) => {
    if (el && el.name) {
      ref.current[el.name] = el;
    }
  };

  const onFinish = () => {
    console.log(ref.current);
    fetch(
      "http://localhost:5000/menu", //api
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          value: Object.keys(ref.current).map((key) => ref.current[key].value),
          username: username,
        }), // values為要傳送的資料
      }
    )
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        if (json === true) {
          // change port if 3001 or 3000
          window.location.assign("http://localhost:3000/ShoppingCart");
        } else {
          alert("Order can't be null!!");
        }
      });
  };

  //button minus
  const onMinus = (e) => {
    const { target } = e;
    console.log(target);
    if (target.nextSibling.value > 0) {
      target.nextSibling.value = target.nextSibling.value - 1;
    }
  };

  //button plus
  const onPlus = (e) => {
    const { target } = e;
    console.log(target);
    if (target.previousSibling.value < 100) {
      target.previousSibling.value = parseInt(target.previousSibling.value) + 1;
    }
  };

  // logout
  const logout = () => {
    // Simple GET request using fetch
    fetch("http://localhost:5000/logOut")
      .then((response) => response.json())
      .then((data) => this.setState({ totalReactPackages: data.total }));
  };

  const showInfo = () => {
    const foodImgContainers = document.querySelectorAll(".foodImg-container");

    // 遍历所有的 .foodImg-container 元素
    foodImgContainers.forEach((container) => {
      // 切换 .show-info 类的存在
      container.classList.toggle("show-info");
    });
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
    } else if (e.key === "32") {
      // Staff Setting page
      window.open(
        "http://localhost:3000/Staff",
        "_blank",
        "width=1200,height=800"
      );
    }
  };

  return (
    <div id="full-menu-component">
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
      <div id="menu-component">
        <div>
          <button id="showInfoButton" onClick={showInfo}>
            顯示食物資訊
          </button>
          <div className="broadImg">
            <h2 className="food-text">主食:</h2>
            <div className="img-text">
              <h4 className="food-name-text">烤雞</h4>
              <div className="foodImg-container" id="foodImgContainer">
                <img src={chickenImg} alt="chickenImg" className="foodImg" />
                <div className="foodImg-text">
                  <p>
                    <span>價格:</span>
                    <span>199元/份</span>
                  </p>
                  <p>
                    <span>熱量:</span>
                    <span>203卡/份</span>
                  </p>
                  <p>
                    <span>蛋白質:</span>
                    <span>22g/份</span>
                  </p>
                  <p>
                    <span>脂肪:</span>
                    <span>11g/份</span>
                  </p>
                  <p>
                    <span>碳水:</span>
                    <span>0g/份</span>
                  </p>
                  <p>
                    <span>糖:</span>
                    <span>0g/份</span>
                  </p>
                  <p>
                    <span>鈉:</span>
                    <span>100mg/份</span>
                  </p>
                </div>
              </div>
              <div className="order-num">
                <button className="plus-minus-button" onClick={onMinus}>
                  -
                </button>
                <input
                  ref={pushRef}
                  type="text"
                  id="chicken-order"
                  name="chicken-order"
                  required
                  minLength="1"
                  maxLength="3"
                  size="1"
                  defaultValue="0"
                />
                <button className="plus-minus-button" onClick={onPlus}>
                  +
                </button>
              </div>
            </div>
            &nbsp;&nbsp;
            <div className="img-text">
              <h4 className="food-name-text">披薩</h4>
              <div className="foodImg-container">
                <img src={pizzaImg} alt="pizzaImg" className="foodImg" />
                <div className="foodImg-text">
                  <p>
                    <span>價格:</span>
                    <span>199元/份</span>
                  </p>
                  <p>
                    <span>熱量:</span>
                    <span>240卡/份</span>
                  </p>
                  <p>
                    <span>蛋白質:</span>
                    <span>13g/份</span>
                  </p>
                  <p>
                    <span>脂肪:</span>
                    <span>17g/份</span>
                  </p>
                  <p>
                    <span>碳水:</span>
                    <span>29g/份</span>
                  </p>
                  <p>
                    <span>糖:</span>
                    <span>5g/份</span>
                  </p>
                  <p>
                    <span>鈉:</span>
                    <span>710mg/份</span>
                  </p>
                </div>
              </div>
              <div className="order-num">
                <button className="plus-minus-button" onClick={onMinus}>
                  -
                </button>
                <input
                  ref={pushRef}
                  type="text"
                  id="pizza-order"
                  name="pizza-order"
                  required
                  minLength="1"
                  maxLength="3"
                  size="1"
                  defaultValue="0"
                />
                <button className="plus-minus-button" onClick={onPlus}>
                  +
                </button>
              </div>
            </div>
            &nbsp;&nbsp;
            <div className="img-text">
              <h4 className="food-name-text">牛排</h4>
              <div className="foodImg-container">
                <img src={steakImg} alt="steakImg" className="foodImg" />
                <div className="foodImg-text">
                  <p>
                    <span>價格:</span>
                    <span>199元/份</span>
                  </p>
                  <p>
                    <span>熱量:</span>
                    <span>162卡/份</span>
                  </p>
                  <p>
                    <span>蛋白質:</span>
                    <span>20g/份</span>
                  </p>
                  <p>
                    <span>脂肪:</span>
                    <span>4g/份</span>
                  </p>
                  <p>
                    <span>碳水:</span>
                    <span>2g/份</span>
                  </p>
                  <p>
                    <span>糖:</span>
                    <span>0g/份</span>
                  </p>
                  <p>
                    <span>鈉:</span>
                    <span>46mg/份</span>
                  </p>
                </div>
              </div>
              <div className="order-num">
                <button className="plus-minus-button" onClick={onMinus}>
                  -
                </button>
                <input
                  ref={pushRef}
                  type="text"
                  id="steak-order"
                  name="steak-order"
                  required
                  minLength="1"
                  maxLength="3"
                  size="1"
                  defaultValue="0"
                />
                <button className="plus-minus-button" onClick={onPlus}>
                  +
                </button>
              </div>
            </div>
            &nbsp;&nbsp;
            <div className="img-text">
              <h4 className="food-name-text">辣炒年糕</h4>
              <div className="foodImg-container">
                <img
                  src={friedRiceCakeImg}
                  alt="friedRiceCakeImg"
                  className="foodImg"
                />
                <div className="foodImg-text">
                  <p>
                    <span>價格:</span>
                    <span>199元/份</span>
                  </p>
                  <p>
                    <span>熱量:</span>
                    <span>319卡/份</span>
                  </p>
                  <p>
                    <span>蛋白質:</span>
                    <span>15g/份</span>
                  </p>
                  <p>
                    <span>脂肪:</span>
                    <span>8g/份</span>
                  </p>
                  <p>
                    <span>碳水:</span>
                    <span>51g/份</span>
                  </p>
                  <p>
                    <span>糖:</span>
                    <span>10g/份</span>
                  </p>
                  <p>
                    <span>鈉:</span>
                    <span>1386mg/份</span>
                  </p>
                </div>
              </div>
              <div className="order-num">
                <button className="plus-minus-button" onClick={onMinus}>
                  -
                </button>
                <input
                  ref={pushRef}
                  type="text"
                  id="friedRiceCake-order"
                  name="friedRiceCake-order"
                  required
                  minLength="1"
                  maxLength="3"
                  size="1"
                  defaultValue="0"
                />
                <button className="plus-minus-button" onClick={onPlus}>
                  +
                </button>
              </div>
            </div>
            &nbsp;&nbsp;
            <div className="img-text">
              <h4 className="food-name-text">龍蝦</h4>
              <div className="foodImg-container">
                <img src={lobsterImg} alt="lobsterImg" className="foodImg" />
                <div className="foodImg-text">
                  <p>
                    <span>價格:</span>
                    <span>199元/份</span>
                  </p>
                  <p>
                    <span>熱量:</span>
                    <span>93卡/份</span>
                  </p>
                  <p>
                    <span>蛋白質:</span>
                    <span>22g/份</span>
                  </p>
                  <p>
                    <span>脂肪:</span>
                    <span>1g/份</span>
                  </p>
                  <p>
                    <span>碳水:</span>
                    <span>0g/份</span>
                  </p>
                  <p>
                    <span>糖:</span>
                    <span>0g/份</span>
                  </p>
                  <p>
                    <span>鈉:</span>
                    <span>198mg/份</span>
                  </p>
                </div>
              </div>
              <div className="order-num">
                <button className="plus-minus-button" onClick={onMinus}>
                  -
                </button>
                <input
                  ref={pushRef}
                  type="text"
                  id="lobster-order"
                  name="lobster-order"
                  required
                  minLength="1"
                  maxLength="3"
                  size="1"
                  defaultValue="0"
                />
                <button className="plus-minus-button" onClick={onPlus}>
                  +
                </button>
              </div>
            </div>
          </div>
          <div className="broadImg">
            <h2 className="food-text">飲料:</h2>
            <div className="img-text">
              <h4 className="food-name-text">可口可樂</h4>
              <div className="foodImg-container">
                <img src={cokeImg} alt="cokeImg" className="foodImg" />
                <div className="foodImg-text">
                  <p>
                    <span>價格:</span>
                    <span>30元/份</span>
                  </p>
                  <p>
                    <span>熱量:</span>
                    <span>139卡/份</span>
                  </p>
                  <p>
                    <span>蛋白質:</span>
                    <span>0g/份</span>
                  </p>
                  <p>
                    <span>脂肪:</span>
                    <span>0g/份</span>
                  </p>
                  <p>
                    <span>碳水:</span>
                    <span>35g/份</span>
                  </p>
                  <p>
                    <span>糖:</span>
                    <span>35g/份</span>
                  </p>
                  <p>
                    <span>鈉:</span>
                    <span>20mg/份</span>
                  </p>
                </div>
              </div>
              <div className="order-num">
                <button className="plus-minus-button" onClick={onMinus}>
                  -
                </button>
                <input
                  ref={pushRef}
                  type="text"
                  id="coke-order"
                  name="coke-order"
                  required
                  minLength="1"
                  maxLength="3"
                  size="1"
                  defaultValue="0"
                />
                <button className="plus-minus-button" onClick={onPlus}>
                  +
                </button>
              </div>
            </div>
            &nbsp;&nbsp;
            <div className="img-text">
              <h4 className="food-name-text">綠茶</h4>
              <div className="foodImg-container">
                <img src={greenTeaImg} alt="greenTeaImg" className="foodImg" />
                <div className="foodImg-text">
                  <p>
                    <span>價格:</span>
                    <span>30元/份</span>
                  </p>
                  <p>
                    <span>熱量:</span>
                    <span>0卡/份</span>
                  </p>
                  <p>
                    <span>蛋白質:</span>
                    <span>0g/份</span>
                  </p>
                  <p>
                    <span>脂肪:</span>
                    <span>0g/份</span>
                  </p>
                  <p>
                    <span>碳水:</span>
                    <span>0g/份</span>
                  </p>
                  <p>
                    <span>糖:</span>
                    <span>0g/份</span>
                  </p>
                  <p>
                    <span>鈉:</span>
                    <span>36mg/份</span>
                  </p>
                </div>
              </div>
              <div className="order-num">
                <button className="plus-minus-button" onClick={onMinus}>
                  -
                </button>
                <input
                  ref={pushRef}
                  type="text"
                  id="greenTea-order"
                  name="greenTea-order"
                  required
                  minLength="1"
                  maxLength="3"
                  size="1"
                  defaultValue="0"
                />
                <button className="plus-minus-button" onClick={onPlus}>
                  +
                </button>
              </div>
            </div>
            &nbsp;&nbsp;
            <div className="img-text">
              <h4 className="food-name-text">珍珠奶茶</h4>
              <div className="foodImg-container">
                <img
                  src={bubbleTeaImg}
                  alt="bubbleTeaImg"
                  className="foodImg"
                />
                <div className="foodImg-text">
                  <p>
                    <span>價格:</span>
                    <span>30元/份</span>
                  </p>
                  <p>
                    <span>熱量:</span>
                    <span>90卡/份</span>
                  </p>
                  <p>
                    <span>蛋白質:</span>
                    <span>0g/份</span>
                  </p>
                  <p>
                    <span>脂肪:</span>
                    <span>0g/份</span>
                  </p>
                  <p>
                    <span>碳水:</span>
                    <span>23g/份</span>
                  </p>
                  <p>
                    <span>糖:</span>
                    <span>10g/份</span>
                  </p>
                  <p>
                    <span>鈉:</span>
                    <span>0mg/份</span>
                  </p>
                </div>
              </div>
              <div className="order-num">
                <button className="plus-minus-button" onClick={onMinus}>
                  -
                </button>
                <input
                  ref={pushRef}
                  type="text"
                  id="bubbleTea-order"
                  name="bubbleTea-order"
                  required
                  minLength="1"
                  maxLength="3"
                  size="1"
                  defaultValue="0"
                />
                <button className="plus-minus-button" onClick={onPlus}>
                  +
                </button>
              </div>
            </div>
            &nbsp;&nbsp;
            <div className="img-text">
              <h4 className="food-name-text">紅茶</h4>
              <div className="foodImg-container">
                <img src={blackTeaImg} alt="blackTeaImg" className="foodImg" />
                <div className="foodImg-text">
                  <p>
                    <span>價格:</span>
                    <span>30元/份</span>
                  </p>
                  <p>
                    <span>熱量:</span>
                    <span>73卡/份</span>
                  </p>
                  <p>
                    <span>蛋白質:</span>
                    <span>5g/份</span>
                  </p>
                  <p>
                    <span>脂肪:</span>
                    <span>5g/份</span>
                  </p>
                  <p>
                    <span>碳水:</span>
                    <span>18g/份</span>
                  </p>
                  <p>
                    <span>糖:</span>
                    <span>18g/份</span>
                  </p>
                  <p>
                    <span>鈉:</span>
                    <span>25mg/份</span>
                  </p>
                </div>
              </div>
              <div className="order-num">
                <button className="plus-minus-button" onClick={onMinus}>
                  -
                </button>
                <input
                  ref={pushRef}
                  type="text"
                  id="blackTea-order"
                  name="blackTea-order"
                  required
                  minLength="1"
                  maxLength="3"
                  size="1"
                  defaultValue="0"
                />
                <button className="plus-minus-button" onClick={onPlus}>
                  +
                </button>
              </div>
            </div>
            &nbsp;&nbsp;
            <div className="img-text">
              <h4 className="food-name-text">蜂蜜</h4>
              <div className="foodImg-container">
                <img src={honeyImg} alt="honeyImg" className="foodImg" />
                <div className="foodImg-text">
                  <p>
                    <span>價格:</span>
                    <span>30元/份</span>
                  </p>
                  <p>
                    <span>熱量:</span>
                    <span>32卡/份</span>
                  </p>
                  <p>
                    <span>蛋白質:</span>
                    <span>0g/份</span>
                  </p>
                  <p>
                    <span>脂肪:</span>
                    <span>0g/份</span>
                  </p>
                  <p>
                    <span>碳水:</span>
                    <span>7g/份</span>
                  </p>
                  <p>
                    <span>糖:</span>
                    <span>7g/份</span>
                  </p>
                  <p>
                    <span>鈉:</span>
                    <span>0mg/份</span>
                  </p>
                </div>
              </div>
              <div className="order-num">
                <button className="plus-minus-button" onClick={onMinus}>
                  -
                </button>
                <input
                  ref={pushRef}
                  type="text"
                  id="honey-order"
                  name="honey-order"
                  required
                  minLength="1"
                  maxLength="3"
                  size="1"
                  defaultValue="0"
                />
                <button className="plus-minus-button" onClick={onPlus}>
                  +
                </button>
              </div>
            </div>
          </div>
          <div className="broadImg">
            <h2 className="food-text">甜點:</h2>
            <div className="img-text">
              <h4 className="food-name-text">甜甜圈</h4>
              <div className="foodImg-container">
                <img src={donutsImg} alt="donutsImg" className="foodImg" />
                <div className="foodImg-text">
                  <p>
                    <span>價格:</span>
                    <span>49元/份</span>
                  </p>
                  <p>
                    <span>熱量:</span>
                    <span>360卡/份</span>
                  </p>
                  <p>
                    <span>蛋白質:</span>
                    <span>4g/份</span>
                  </p>
                  <p>
                    <span>脂肪:</span>
                    <span>1g/份</span>
                  </p>
                  <p>
                    <span>碳水:</span>
                    <span>84g/份</span>
                  </p>
                  <p>
                    <span>糖:</span>
                    <span>16g/份</span>
                  </p>
                  <p>
                    <span>鈉:</span>
                    <span>176mg/份</span>
                  </p>
                </div>
              </div>
              <div className="order-num">
                <button className="plus-minus-button" onClick={onMinus}>
                  -
                </button>
                <input
                  ref={pushRef}
                  type="text"
                  id="donuts-order"
                  name="donuts-order"
                  required
                  minLength="1"
                  maxLength="3"
                  size="1"
                  defaultValue="0"
                />
                <button className="plus-minus-button" onClick={onPlus}>
                  +
                </button>
              </div>
            </div>
            &nbsp;&nbsp;
            <div className="img-text">
              <h4 className="food-name-text">冰淇淋</h4>
              <div className="foodImg-container">
                <img src={icecreamImg} alt="icecreamImg" className="foodImg" />
                <div className="foodImg-text">
                  <p>
                    <span>價格:</span>
                    <span>49元/份</span>
                  </p>
                  <p>
                    <span>熱量:</span>
                    <span>118卡/份</span>
                  </p>
                  <p>
                    <span>蛋白質:</span>
                    <span>4g/份</span>
                  </p>
                  <p>
                    <span>脂肪:</span>
                    <span>1g/份</span>
                  </p>
                  <p>
                    <span>碳水:</span>
                    <span>23g/份</span>
                  </p>
                  <p>
                    <span>糖:</span>
                    <span>6g/份</span>
                  </p>
                  <p>
                    <span>鈉:</span>
                    <span>99mg/份</span>
                  </p>
                </div>
              </div>
              <div className="order-num">
                <button className="plus-minus-button" onClick={onMinus}>
                  -
                </button>
                <input
                  ref={pushRef}
                  type="text"
                  id="icecream-order"
                  name="icecream-order"
                  required
                  minLength="1"
                  maxLength="3"
                  size="1"
                  defaultValue="0"
                />
                <button className="plus-minus-button" onClick={onPlus}>
                  +
                </button>
              </div>
            </div>
            &nbsp;&nbsp;
            <div className="img-text">
              <h4 className="food-name-text">棉花糖</h4>
              <div className="foodImg-container">
                <img
                  src={marshmallowImg}
                  alt="marshmallowImg"
                  className="foodImg"
                />
                <div className="foodImg-text">
                  <p>
                    <span>價格:</span>
                    <span>49元/份</span>
                  </p>
                  <p>
                    <span>熱量:</span>
                    <span>334卡/份</span>
                  </p>
                  <p>
                    <span>蛋白質:</span>
                    <span>3g/份</span>
                  </p>
                  <p>
                    <span>脂肪:</span>
                    <span>1g/份</span>
                  </p>
                  <p>
                    <span>碳水:</span>
                    <span>78g/份</span>
                  </p>
                  <p>
                    <span>糖:</span>
                    <span>55g/份</span>
                  </p>
                  <p>
                    <span>鈉:</span>
                    <span>73mg/份</span>
                  </p>
                </div>
              </div>
              <div className="order-num">
                <button className="plus-minus-button" onClick={onMinus}>
                  -
                </button>
                <input
                  ref={pushRef}
                  type="text"
                  id="marshmallow-order"
                  name="marshmallow-order"
                  required
                  minLength="1"
                  maxLength="3"
                  size="1"
                  defaultValue="0"
                />
                <button className="plus-minus-button" onClick={onPlus}>
                  +
                </button>
              </div>
            </div>
            &nbsp;&nbsp;
            <div className="img-text">
              <h4 className="food-name-text">巧克力</h4>
              <div className="foodImg-container">
                <img
                  src={chocolateImg}
                  alt="chocolateImg"
                  className="foodImg"
                />
                <div className="foodImg-text">
                  <p>
                    <span>價格:</span>
                    <span>49元/份</span>
                  </p>
                  <p>
                    <span>熱量:</span>
                    <span>613卡/份</span>
                  </p>
                  <p>
                    <span>蛋白質:</span>
                    <span>11g/份</span>
                  </p>
                  <p>
                    <span>脂肪:</span>
                    <span>46g/份</span>
                  </p>
                  <p>
                    <span>碳水:</span>
                    <span>39g/份</span>
                  </p>
                  <p>
                    <span>糖:</span>
                    <span>11g/份</span>
                  </p>
                  <p>
                    <span>鈉:</span>
                    <span>73mg/份</span>
                  </p>
                </div>
              </div>
              <div className="order-num">
                <button className="plus-minus-button" onClick={onMinus}>
                  -
                </button>
                <input
                  ref={pushRef}
                  type="text"
                  id="chocolate-order"
                  name="chocolate-order"
                  required
                  minLength="1"
                  maxLength="3"
                  size="1"
                  defaultValue="0"
                />
                <button className="plus-minus-button" onClick={onPlus}>
                  +
                </button>
              </div>
            </div>
            &nbsp;&nbsp;
            <div className="img-text">
              <h4 className="food-name-text">特別甜點</h4>
              <div className="foodImg-container">
                <img src={specialImg} alt="specialImg" className="foodImg" />
                <div className="foodImg-text">
                  <p>
                    <span>價格:</span>
                    <span>49元/份</span>
                  </p>
                  <p>
                    <span>熱量:</span>
                    <span>250卡/份</span>
                  </p>
                  <p>
                    <span>蛋白質:</span>
                    <span>15g/份</span>
                  </p>
                  <p>
                    <span>脂肪:</span>
                    <span>30g/份</span>
                  </p>
                  <p>
                    <span>碳水:</span>
                    <span>30g/份</span>
                  </p>
                  <p>
                    <span>糖:</span>
                    <span>50g/份</span>
                  </p>
                  <p>
                    <span>鈉:</span>
                    <span>75mg/份</span>
                  </p>
                </div>
              </div>
              <div className="order-num">
                <button className="plus-minus-button" onClick={onMinus}>
                  -
                </button>
                <input
                  ref={pushRef}
                  type="text"
                  id="special-order"
                  name="special-order"
                  required
                  minLength="1"
                  maxLength="3"
                  size="1"
                  defaultValue="0"
                />
                <button className="plus-minus-button" onClick={onPlus}>
                  +
                </button>
              </div>
            </div>
          </div>
          <br></br>
          <button className="submit" onClick={onFinish}>
            加入購物車
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderMenu;
