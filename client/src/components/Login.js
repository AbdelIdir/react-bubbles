import React, { useState } from "react";
import { AxiosAuth } from "./AxiosAuth";
import { BrowserRouter as Router, Link } from "react-router-dom";

const Login = props => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const [userCredentials, setUserCredentials] = useState({
    username: "",
    password: ""
  });

  const onFormValueChange = event => {
    const { name, value } = event.target;
    setUserCredentials({
      ...userCredentials,
      [name]: value
    });
  };

  const onLogin = e => {
    e.preventDefault();
    AxiosAuth()
      .post("/login", userCredentials)
      .then(res => {
        console.log(res);
        window.localStorage.setItem("token", res.data.payload);
        alert("login successful !");
        props.history.push("/bubble-page");
      })
      .catch(err => console.log("not working", err));
  };
  return (
    <Router>
      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <h1>Welcome to the Bubble App!</h1>
        <Link
          to="/bubble-page"
          onClick={() => {
            props.history.push("/bubble-page");
          }}
        >
          Bubble Page
        </Link>
        <form
          onSubmit={onLogin}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <input
            type="text"
            name="username"
            value={userCredentials.username}
            placeholder="enter user id"
            onChange={onFormValueChange}
          />
          <input
            type="password"
            name="password"
            value={userCredentials.password}
            placeholder="enter password"
            onChange={onFormValueChange}
          />
          <button style={{ width: "200px" }}>Log in</button>
        </form>
      </div>
    </Router>
  );
};

export default Login;
