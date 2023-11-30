import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Style/LoginPage.css";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userdeail, setUserdeail] = useState("");
  const [message, setMessage] = useState("");
  const URL = "http://localhost:5500/user/login";
  console.log(userdeail);

  const handleLogin = () => {
    const userData = {
      email: email,
      password: password,
    };
    fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setUserdeail(data.userDeatil);
          setMessage(data.message);
          console.log(data);
        } else {
          setMessage({ message: "Login failed" });
        }
      });
  };
  return (
    <div className="login-Container">
      
      <div className="login_Container">
      <div className="nav_Logo">
          <img
            width="100"
            height="100"
            src="https://img.icons8.com/clouds/100/a.png"
            alt="a-logo"
          />
        </div>
        <form>
          <h1>Login</h1>
          <label htmlFor="login">User Name</label>
          <input
            type="text"
            id="login"
            className="login"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <br />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="password"
            onChange={(p) => setPassword(p.target.value)}
            value={password}
          />
          <br />
          <input
            type="button"
            value="Login"
            className="login_Button"
            onClick={() => {
              handleLogin();
              navigate(`/home`);
            }}
          />
          <p className="notification">{message}</p>
        </form>

        <div className="account">
          Don’t have account?
          <span className="create_Account" onClick={() => navigate("/singup")}>
            Sign up
          </span>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
