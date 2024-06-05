import React, { useEffect, useState } from "react";
import "./Staff.css";
import { Select, Space } from "antd";
import { Button, Flex } from "antd";
function Staff() {
  const [DeliveryStatus, setDeliveryStatus] = useState(1);
  const [Username, setUsername] = useState(null);
  // title
  useEffect(() => {
    getDeliveryStatus();
    getUsername();
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

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const getDeliveryStatusText = (value) => {
    if (value === 1) {
      return "準備中";
    } else if (value === 2) {
      return "遞送中";
    } else if (value === 3) {
      return "已送達";
    }
  };

  // submit status change
  const changeStatus = () => {};

  return (
    <div id="welcome-component">
      <div id="text-component">
        <h1 className="username-text">更改使用狀態:</h1>
        <h1 className="username-text">
          使用者: {Username ? Username : <>沒有使用者</>}
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
              ]}
            />
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
  );
}

export default Staff;
