import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import "./Register.css";

let headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

const Register = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values); // values為要傳送的資料
    fetch(
      "http://localhost:5000/register", //api
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
          alert("Account created successfully.");
          // change port if 3001 or 3000
          window.location.assign("http://localhost:3000/Login");
        } else {
          alert("Account has already created.");
        }
      });
  };

  return (
    <div id="register-component">
      <h1 id="register-text">註冊</h1>
      <Form
        name="normal_register"
        className="register-form"
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
          </div>
        </Form.Item>

        <Form.Item>
          <div id="register-button">
            <Button
              type="default"
              htmlType="submit"
              className="register-form-button"
            >
              Register
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
