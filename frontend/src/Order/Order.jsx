import React, { useState, useEffect } from "react";
import "./Order.css";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import preparingImg from "./preparing.png";
import deliveringImg from "./delivering.png";
import completeImg from "./complete.jpg";

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

function Order() {
  // useState hook to get Delivery Status state
  const [DeliveryStatus, setDeliveryStatus] = useState(1);
  // useState hook to manage price
  const [price, setPrice] = useState(null);
  // useState hook to get Order Data
  const [orderData, setOrderData] = useState(null);
  console.log(orderData);
  useEffect(() => {
    getDeliveryStatus();
    getPrice();
    getOrderData();
    // title
    document.title = "Order Info";
  }, []);

  // get Delivery Status
  const getOrderData = () => {
    // get Order
    fetch("http://localhost:5000/getOrder")
      .then((response) => response.json())
      .then((data) => {
        setOrderData(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // get Delivery Status
  const getDeliveryStatus = () => {
    // send Order
    fetch("http://localhost:5000/getDeliveryStatus")
      .then((response) => response.json())
      .then((data) => {
        setDeliveryStatus(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // get Price
  const getPrice = () => {
    // send Order
    fetch("http://localhost:5000/getPrice")
      .then((response) => response.json())
      .then((data) => {
        setPrice(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // time settings
  if (orderData){
    var username = orderData[0];
    var time = orderData[16];
    var timeYY = time.substring(0,4);
    var timeMM = time.substring(5,7);
    var timeDD = time.substring(8,10);
    var timeHour = time.substring(11,13);
    var timeMinute = time.substring(14,16);
    var timeSecond = time.substring(17,19);
  };
  
  // Delivery status
  var DeliveryText;
  if (DeliveryStatus){
    if (DeliveryStatus === 1){
      DeliveryText = "餐點準備中";
    }else if (DeliveryStatus === 2){
      DeliveryText = "餐點運送中";
    }else if (DeliveryStatus === 3){
      DeliveryText = "餐點已送達";
    }
  };

  // logout
  const logout = () => {
    // Simple GET request using fetch
    fetch("http://localhost:5000/logOut")
      .then((response) => response.json())
      .then((data) => this.setState({ totalReactPackages: data.total }));
  };

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
    <div className="order-full-componenet">
      {/* menu */}
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
      {/* main component */}
      <div className="order-componenets">
        {/* <h1 id="order-data-text">訂單資訊頁面</h1>
        <div className="food-status">
          {DeliveryStatus === 1 ? (
            <div className="food-status-component">
              <div className="food-img">
                <img
                  src={preparingImg}
                  alt="preparingImg"
                  className="food-status-img"
                ></img>
              </div>
              <h2 className="order-status-text">餐點準備中</h2>
            </div>
          ) : DeliveryStatus === 2 ? (
            <div>
              <img
                src={deliveringImg}
                alt="deliveringImg"
                className="food-status-img"
              ></img>
              <h2 className="order-status-text">餐點運送中</h2>
            </div>
          ) : (
            <div>
              <img
                src={completeImg}
                alt="completeImg"
                className="food-status-img"
              ></img>
              <h2 className="order-status-text">餐點已送達</h2>
            </div>
          )}
        </div> */}
        {/* <div id="cut-line"></div> */}
        {/* <div id="order-price-component">
          <div id="order-price-text">
            <h2 id="price-text-h2">訂單金額:{price}</h2>
          </div>
        </div> */}
        <div id="order-info">
          <h1 className="order-info-text">
            訂購人
          </h1>
          <h1 className="order-info-text">
            訂單時間
          </h1>
          <h1 className="order-info-text">
            訂單內容
          </h1>
          <h1 className="order-info-text">
            訂單狀態
          </h1>
          <h1 className="order-info-text">
            總金額
          </h1>
        </div>
        <div id="user-info">
          <h1 className="user-info-text">
            {username}
          </h1>
          <h1 className="user-info-text">
            {timeYY}年&thinsp;
            {timeMM}月&thinsp;
            {timeDD}日&thinsp;
            {timeHour}時&thinsp;
            {timeMinute}分&thinsp;
            {timeSecond}秒&thinsp;
          </h1>
          <h1 className="user-info-text">
            {orderData}
          </h1>
          <h1 className="user-info-text">
            {DeliveryText}
          </h1>
          <h1 className="user-info-text">
            {price}
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Order;
