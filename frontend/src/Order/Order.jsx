import React, { useState, useEffect } from "react";
import "./Order.css";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Empty } from "antd";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
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

function Order() {
  // useState hook to get Delivery Status state
  const [DeliveryStatus, setDeliveryStatus] = useState(1);
  // useState hook to manage price
  const [price, setPrice] = useState(null);
  // useState hook to get Order Data
  const [orderData, setOrderData] = useState(null);
  // console.log(orderData);

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
  if (orderData !== null) {
    if (orderData !== "false") {
      console.log(orderData);
      var username = orderData[0];
      var time = orderData[16];
      var timeYY = time.substring(0, 4);
      var timeMM = time.substring(5, 7);
      var timeDD = time.substring(8, 10);
      var timeHour = time.substring(11, 13);
      var timeMinute = time.substring(14, 16);
      var timeSecond = time.substring(17, 19);
    }
  }

  // Delivery status
  var DeliveryText;
  if (DeliveryStatus) {
    if (DeliveryStatus === 1) {
      DeliveryText = "餐點準備中";
    } else if (DeliveryStatus === 2) {
      DeliveryText = "餐點運送中";
    } else if (DeliveryStatus === 3) {
      DeliveryText = "餐點已送達";
    }
  }

  // logout
  const logout = () => {
    // Simple GET request using fetch
    fetch("http://localhost:5000/logOut")
      .then((response) => response.json())
      .then((data) => this.setState({ totalReactPackages: data.total }));
  };

  // button show up
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const foodEmpty = (num) => {
    if (orderData) {
      if (orderData[num] !== "0") {
        return orderData;
      } else {
        return 0;
      }
    }
  };

  const isOrderEmpty = () => {
    console.log(orderData)
    if (orderData === null || orderData === undefined || orderData === "false") {
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
        {isOrderEmpty() ? (
          // if no Order in this username, show empty icon
          <div id="empty-component">
            <Empty />
          </div>
        ) : (
          <div>
            <div id="order-info">
              <h1 className="order-info-text">訂購人</h1>
              <h1 className="order-info-text">訂單時間</h1>
              <h1 className="order-info-text">訂單內容</h1>
              <h1 className="order-info-text">訂單狀態</h1>
              <h1 className="order-info-text">總金額</h1>
            </div>
            <div id="user-info">
              <h1 className="user-info-text">{username}</h1>
              <h1 className="user-info-text">
                {timeYY}年&thinsp;
                {timeMM}月&thinsp;
                {timeDD}日&thinsp;
                {timeHour}時&thinsp;
                {timeMinute}分&thinsp;
                {timeSecond}秒&thinsp;
              </h1>
              <h1 className="user-info-text">
                <React.Fragment>
                  <Button
                    id="show-info-button"
                    variant="outlined"
                    onClick={handleClickOpen}
                  >
                    顯示資訊
                  </Button>
                  <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                  >
                    <DialogTitle>{"訂單資訊"}</DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-slide-description">
                        <div className="info-comtainer">
                          {foodEmpty(1) !== 0 ||
                            foodEmpty(2) !== 0 ||
                            foodEmpty(3) !== 0 ||
                            foodEmpty(4) !== 0 ||
                            foodEmpty(5) !== 0 ? (
                            <div>
                              <>&ensp; 主食 :</>
                              <div>
                                {foodEmpty(1) ? (
                                  <>&ensp; &emsp; 烤雞 : {orderData[1]} 份</>
                                ) : (
                                  <></>
                                )}
                              </div>
                              <div>
                                {foodEmpty(2) ? (
                                  <>&ensp; &emsp; 披薩 : {orderData[2]} 份</>
                                ) : (
                                  <></>
                                )}
                              </div>
                              <div>
                                {foodEmpty(3) ? (
                                  <>&ensp; &emsp; 牛排 : {orderData[3]} 份</>
                                ) : (
                                  <></>
                                )}
                              </div>
                              <div>
                                {foodEmpty(4) ? (
                                  <>&ensp; &emsp; 辣炒年糕 : {orderData[4]} 份</>
                                ) : (
                                  <></>
                                )}
                              </div>
                              <div>
                                {foodEmpty(5) ? (
                                  <>&ensp; &emsp; 龍蝦 : {orderData[5]} 份</>
                                ) : (
                                  <></>
                                )}
                              </div>
                            </div>
                          ) : (
                            <></>
                          )}
                        </div>
                        <div className="info-comtainer">
                          {foodEmpty(6) !== 0 ||
                            foodEmpty(7) !== 0 ||
                            foodEmpty(8) !== 0 ||
                            foodEmpty(9) !== 0 ||
                            foodEmpty(10) !== 0 ? (
                            <div>
                              <>&ensp; 飲料 :</>
                              <div>
                                {foodEmpty(6) ? (
                                  <>&emsp; &emsp; 可樂 : {orderData[6]} 杯</>
                                ) : (
                                  <></>
                                )}
                              </div>
                              <div>
                                {foodEmpty(7) ? (
                                  <>&ensp; &emsp; 綠茶 : {orderData[7]} 杯</>
                                ) : (
                                  <></>
                                )}
                              </div>
                              <div>
                                {foodEmpty(8) ? (
                                  <>&ensp; &emsp; 珍珠奶茶 : {orderData[8]} 杯</>
                                ) : (
                                  <></>
                                )}
                              </div>
                              <div>
                                {foodEmpty(9) ? (
                                  <>&ensp; &emsp; 紅茶 : {orderData[9]} 杯</>
                                ) : (
                                  <></>
                                )}
                              </div>
                              <div>
                                {foodEmpty(10) ? (
                                  <>&ensp; &emsp; 蜂蜜 : {orderData[10]} 杯</>
                                ) : (
                                  <></>
                                )}
                              </div>
                            </div>
                          ) : (
                            <></>
                          )}
                        </div>
                        <div className="info-comtainer">
                          {foodEmpty(11) !== 0 ||
                            foodEmpty(12) !== 0 ||
                            foodEmpty(13) !== 0 ||
                            foodEmpty(14) !== 0 ||
                            foodEmpty(15) !== 0 ? (
                            <div>
                              <>&ensp; 甜點 : </>
                              <div>
                                {foodEmpty(11) ? (
                                  <>&ensp; &emsp; 甜甜圈 : {orderData[11]} 份</>
                                ) : (
                                  <></>
                                )}
                              </div>
                              <div>
                                {foodEmpty(12) ? (
                                  <>&ensp; &emsp; 冰淇淋 : {orderData[12]} 份</>
                                ) : (
                                  <></>
                                )}
                              </div>
                              <div>
                                {foodEmpty(13) ? (
                                  <>&ensp; &emsp; 棉花糖 : {orderData[13]} 份</>
                                ) : (
                                  <></>
                                )}
                              </div>
                              <div>
                                {foodEmpty(14) ? (
                                  <>&ensp; &emsp; 巧克力 : {orderData[14]} 份</>
                                ) : (
                                  <></>
                                )}
                              </div>
                              <div>
                                {foodEmpty(15) ? (
                                  <>&ensp; &emsp; 特別甜點 : {orderData[15]} 份</>
                                ) : (
                                  <></>
                                )}
                              </div>
                            </div>
                          ) : (
                            <></>
                          )}
                        </div>
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>確定</Button>
                    </DialogActions>
                  </Dialog>
                </React.Fragment>
              </h1>
              <h1 className="user-info-text">{DeliveryText}</h1>
              <h1 className="user-info-text">{price}</h1>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Order;
