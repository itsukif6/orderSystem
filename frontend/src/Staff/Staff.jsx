import React, { useEffect, useState } from "react";
import "./Staff.css";
import { Select, Space } from "antd";
import { Button, Flex } from "antd";

let headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

function Staff() {
  const [orderData, setOrderData] = useState(null);
  const [DeliveryStatus, setDeliveryStatus] = useState(1);
  const [Username, setUsername] = useState(null);
  const [submitStatus, setsubmitStatus] = useState(DeliveryStatus);


  useEffect(() => {
    getOrderData();
    getDeliveryStatus();
    getUsername();
    // title
    document.title = "Staff setting page";
  }, []);

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
  const getUsername = () => {
    // send Order
    fetch("http://localhost:5000/getUsername")
      .then((response) => response.json())
      .then((data) => {
        setUsername(data.username);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // update Delivery
  const updateDeliveryStatus = (status) => {
    // send Order
    fetch(
      "http://localhost:5000/updateDeliveryStatus", //api
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          value: status
        }), // values為要傳送的資料
      }
    )
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
      });
  };

  // delete Delivery
  const deleteDelivery = () => {
    // send Order
    fetch("http://localhost:5000/deleteDelivery")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // handle Change
  const handleChange = (value) => {
    console.log(`selected ${value}`);
    setsubmitStatus(value);
  };

  // get Delivery Status Text
  const getDeliveryStatusText = (value) => {
    if (value === 1) {
      return "準備中";
    } else if (value === 2) {
      return "遞送中";
    } else if (value === 3) {
      return "已送達";
    }
  };

  const [value, setValue] = useState("");
  const [result, setResult] = useState("");

  // handle Staff Password Input
  function handleStaffPasswordInput(e) {
    setValue(e.target.value);
    setResult("");
    // console.log(e.target.value, result);
  };

  const [showPasswordComponent, setShowPasswordComponent] = useState(true);
  const [showChangeInput, setShowChangeInput] = useState(false);

  // handle Submit
  function handleSubmit(e) {
    e.preventDefault();
    // Hide the password component and show the change input component
    setShowPasswordComponent(false);
    if (value === "12345678") {
      console.log("1");
      setShowChangeInput(true);
    } else {
      alert("Password wrong, please F5 and try again.");
    }
  };

  // set time to shut down 
  const delay = millis => new Promise((resolve, reject) => {
    setTimeout(_ => resolve(), millis)
  });


  // submit status change submit
  const changeStatus = async () => {
    console.log("submitStatus", submitStatus);
    if (submitStatus === "準備中") {
      updateDeliveryStatus(0);
      console.log("DB改為準備中");
    } else if (submitStatus === "遞送中") {
      updateDeliveryStatus(1);
      console.log("DB改為遞送中");
    } else if (submitStatus === "已送達") {
      console.log("DB改為已送達");
      deleteDelivery();
      await delay(1500);
      window.close();
    };
  };


  console.log(orderData)
  return (
    <div id="welcome-component">
      <>
        {showPasswordComponent && (
          <div id="password">
            <form onSubmit={handleSubmit} id="staff-password-component">
              <p id="staff-password-text">請輸入密碼:</p>
              <input value={value} onInput={handleStaffPasswordInput} required type="text" id="staff-password" />
              <button type="submit" id="staff-password-submit-button" >送出</button>
            </form>
            {result && <p>{result}</p>}
          </div>
        )}
        {showChangeInput && (
          <div id="change-input">
            <div id="text-component">
              <h1 className="username-text">更改使用狀態:</h1>
              <h1 className="username-text">
                使用者: {(orderData !== "false") ? Username : <>沒有使用者</>}
              </h1>
            </div>
            {Username !== null ? (
              <>
                <Space wrap>
                  <Select
                    defaultValue={getDeliveryStatusText(DeliveryStatus)}
                    style={{
                      width: 120,
                    }}
                    onChange={handleChange}
                    options={[
                      {
                        value: "準備中",
                        label: "準備中",
                      },
                      {
                        value: "遞送中",
                        label: "遞送中",
                      },
                      {
                        value: "已送達",
                        label: "已送達",
                      },
                    ]} />
                </Space>
                <Flex gap="small" wrap>
                  <Button type="primary" onClick={changeStatus}>
                    確定
                  </Button>
                </Flex>
              </>
            ) : (
              <></>
            )}
          </div>
        )}

      </>
    </div>
  );
}

export default Staff;
