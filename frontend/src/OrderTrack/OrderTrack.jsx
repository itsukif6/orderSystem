import React, { useState, useEffect } from "react";
import "./OrderTrack.css";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import preparingImg from "./preparing.png";
import deliveringImg from "./delivering.png";
import completeImg from "./complete.jpg";
import { Empty } from "antd";

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

function OrderTrack() {
  // useState hook to manage Delivery Status state
  const [DeliveryStatus, setDeliveryStatus] = useState(0);
  // useState hook to manage price
  const [price, setPrice] = useState(null);

  useEffect(() => {
    getPrice();
    getDeliveryStatus();
    // title
    document.title = "Order Track";
  }, []);

  // get Delivery Status
  const getDeliveryStatus = () => {
    // send Order
    fetch("http://localhost:5000/getDeliveryStatus")
      .then((response) => response.json())
      .then((data) => {
        if (data == 1) {
          console.log("DeliveryStatus",data)
            document.getElementById('cut-line').style.marginTop = '12rem';
        } else if (data == 2) {
            console.log("DeliveryStatus",data)
            document.getElementById('cut-line').style.marginTop = '0rem';
        } else if (data == 3) {
          console.log("DeliveryStatus",data)
            document.getElementById('cut-line').style.marginTop = '0rem';
        }
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

  // logout
  const logout = () => {
    // Simple GET request using fetch
    fetch("http://localhost:5000/logOut")
      .then((response) => response.json())
      .then((data) => this.setState({ totalReactPackages: data.total }));
  };

  const isOrderEmpty = () => {
    console.log(price)
    if (price === null || price === undefined || price === false) {
      return true; // Cart is empty if it's null or undefined
    } else {
      return false; // Cart is not empty if it's any other value
    }
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
        "https://mail.google.com/mail/u/0/?hl=zh-TW#inbox?compose=DmwnWrRtsnXNcbPtcwnvnnCjlFLJNvwkDzGhzkmVcmzqCZlbqDwxsgnKsJJTBxqmNNCvCswGLRdb",
        "_blank",
        "width=1200,height=800"
      );
    } else if (e.key === "13") {
      // owner gmail API
      window.open(
        "https://mail.google.com/mail/u/0/?hl=zh-TW#inbox?compose=DmwnWrRtsnXNcbPtcwnvnnCjlFLJNvwkDzGhzkmVcmzqCZlbqDwxsgnKsJJTBxqmNNCvCswGLRdb",
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
      // shopping cart API
      window.location.assign("http://localhost:3000/ShoppingCart");
    } else if (e.key === "25") {
      // order API
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
    <div className="ordertrack-full-componenet">
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
      <div className="ordertrack-componenet">
        {isOrderEmpty() ? (
          // if no Order in this username, show empty icon
          <div id="empty-component1">
            <Empty />
          </div>
        ) : (
          <><h1 id="ordertrack-data-text">訂單送餐狀態頁面</h1><div className="food-status">
            {DeliveryStatus === 1 ? (
              <div className="food-status-component">
                <div className="food-img">
                  <img
                    src={preparingImg}
                    alt="preparingImg"
                    className="food-status-img"
                  ></img>
                </div>
                <h2 className="ordertrack-status-text">餐點準備中</h2>
              </div>
            ) : DeliveryStatus === 2 ? (
              <div>
                <img
                  src={deliveringImg}
                  alt="deliveringImg"
                  className="food-status-img"
                ></img>
                <h2 className="ordertrack-status-text">餐點運送中</h2>
              </div>
            ) : (
              <div>
                <img
                  src={completeImg}
                  alt="completeImg"
                  className="food-status-img"
                ></img>
                <h2 className="ordertrack-status-text">餐點已送達</h2>
              </div>
            )}
          </div>
            <div id="cut-line"></div>
            <div id="ordertrack-price-component">
              <div id="ordertrack-price-text">
                <h2 id="price-text-h2">訂單金額:{price}</h2>
              </div>
            </div></>
        )}
      </div>
    </div>
  );
}

export default OrderTrack;
