import React, { useState } from "react";
import { AxiosAuth } from "./AxiosAuth";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import VpnKeyOutlinedIcon from "@material-ui/icons/VpnKeyOutlined";

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

  const useStyles = makeStyles({
    card: {
      maxWidth: 345
    }
  });
  const classes = useStyles();
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
        {/* <form
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
        </form> */}

        <form
          className={classes.root}
          noValidate
          autoComplete="off"
          onSubmit={onLogin}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "180px"
          }}
        >
          <TextField
            id="outlined-basicc"
            label="UserName"
            variant="outlined"
            type="text"
            name="username"
            value={userCredentials.username}
            placeholder="enter user id"
            onChange={onFormValueChange}
            style={{ width: "300px" }}
          />

          <TextField
            style={{ color: "white" }}
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type="password"
            name="password"
            value={userCredentials.password}
            placeholder="enter password"
            onChange={onFormValueChange}
            style={{ width: "300px", marginTop: "20px" }}
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<VpnKeyOutlinedIcon />}
            type="submit"
            style={{ marginTop: "25px" }}
          >
            LogIn
          </Button>
        </form>
      </div>
    </Router>
  );
};

export default Login;
