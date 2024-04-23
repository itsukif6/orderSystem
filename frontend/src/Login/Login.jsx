import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import './Login.css';

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
}

//以下是API文件中提及必寫的主體参數。而以下這個產品資料是六角學院提供的。
// let body = {
//     "title": "Abysswalker",
//     "category": "T-Shirts",
//     "content": "Its wearer, like Artorias himself, can traverse the Abyss.",
//     "description": "This official Dark Souls shirt was designed by Nina Matsumoto and printed on soft 100% cotton shirts by Forward. Each one comes with a bonus sticker.",
//     "imageUrl": ["https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1349&q=80"]
// }

const App = () => {
    // 傳資料用
    const onFinish = (values) => {
        console.log('Received values of form: ', values); // values為要傳送的資料
        fetch("http://localhost:5000/login", //api
            {
                method: "POST",
                headers: headers,
                body: JSON.stringify(values) // values為要傳送的資料
            })
            .then(response => response.json())
            .then(json => {
                console.log(json);
                if (json === true) {
                    window.location.assign("http://localhost:3001/Menu");
                } else {
                    alert("Wrong account or password.");
                }
            });
    };
    const handleRegisterClick = () => {
        window.location.assign("http://localhost:3001/Register");
    };
    

    return (
        <div id="components-form-demo-normal-login" className="background-image-container">
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
                            message: 'Please input your Username!',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
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
                        <Button type="default" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                        &nbsp;
                        <Button type="default" htmlType="submit" className="login-form-button" onClick={handleRegisterClick}>
                            Register
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </div>
    );
};

export default App;
