import React, { createContext, useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import "./Login.css";

let headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};



// 原本用來傳username的,現在換方法了
const User = createContext("");

const App = () => {
  // 原本用來傳username的,現在換方法了
  const [usernamevalue, setValue] = useState("");
  
  // 傳資料用
  const onFinish = (values) => {
    console.log("Received values of form: ", values); // values為要傳送的資料

    fetch(
      "http://localhost:5000/login", //api
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(values), // values為要傳送的資料
      }
    )
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        if (json === true) {
          // change port if 3001 or 3000
          window.location.assign("http://localhost:3000/Menu");
        } else {
          alert("Wrong account or password.");
        }
      });
    setValue(values["username"]);
  };
  const handleRegisterClick = () => {
    window.location.assign("http://localhost:3000/Register");
  };

  return (
    <User.Provider value={usernamevalue}>
      <div
        id="components-form-demo-normal-login"
        className="background-image-container"
      >
        <h1 id="login-string">飲料點餐系統登入</h1>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <div>
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
              <a className="login-form-forgot" href="">
                Forgot password?
              </a>
            </div>
          </Form.Item>

          <Form.Item>
            <div>
              <Button
                type="default"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
              &nbsp;
              <Button
                type="default"
                htmlType="submit"
                className="login-form-button"
                onClick={handleRegisterClick}
              >
                Register
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </User.Provider>
  );
};

export default App;
