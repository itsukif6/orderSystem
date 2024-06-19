import React, { useState, useEffect } from "react";
import "./ForgetPassword.css";

const ForgetPassword = () => {
    const [json_userpw, setjson_userpw] = useState(null);

    // title
    useEffect(() => {
        document.title = 'Forget Password';
    }); // This effect will run every time json_userpw changes

    function sendEmail() {
        const username_input = document.getElementById('username-input').value;
        const email_input = document.getElementById('email-input').value;
        console.log(username_input, email_input);
        getPassword(username_input, email_input);
    };

    function getPassword(username_input, email_input) {
        fetch("http://localhost:5000/email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json" // Ensure the header is defined properly
            },
            body: JSON.stringify({
                user_email: email_input,
                username: username_input,
            }),
        })
            .then((response) => response.json())
            .then((json) => {
                setjson_userpw(json.user_password);
            }).then((res) => {
                if (json_userpw !== null) {
                    window.alert("密碼已送到您的信箱");
                    window.location.assign("http://localhost:3000");
                } else {
                    window.alert("找不到使用者");
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };


    return (
        <div id='full'>
            <h1 id='forgetpw-text'>請輸入使用者名稱</h1>
            <div className="forgetpw-input">
                <p id='forgetpw-text'>使用者名:</p>
                <input id='username-input'></input>
            </div>
            <div className="forgetpw-input">
                <p id='forgetpw-text'>電子郵件:</p>
                <input id='email-input'></input>
            </div>
            <br />
            <button id='username-button' onClick={sendEmail}>送出</button>
        </div>
    );
};

export default ForgetPassword;
