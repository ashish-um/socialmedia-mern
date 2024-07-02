import React from "react";
import { useState, useRef } from "react";
import axios from "axios";
import "./auth.css";
import { useCookies } from "react-cookie";

import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [register, setRegister] = useState(false);

  if (register) {
    return <Register setRegister={setRegister} />;
  }

  return <Login setRegister={setRegister} />;
};

const Login = ({ setRegister }) => {
  const navigate = useNavigate();
  const [togglePass, setTogglePass] = useState(false);

  const [_, setCookies] = useCookies(["access_token"]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const username = e.target.elements.username.value;
    const password = e.target.elements.password.value;

    try {
      const response = await axios.post(
        "https://socialmedia-mern-api.vercel.app/auth/login",
        {
          username,
          password,
        }
      );
      console.log(response.data);
      setCookies("access_token", response.data.token);
      localStorage.setItem("userID", response.data.userID);
      localStorage.setItem("username", response.data.username);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h3>Login</h3>
      <div>
        <p>Username:</p>
        <input type="text" name="username" />
      </div>
      <div>
        <p>
          Password:{"  "}
          <input
            type="checkbox"
            name="toggle_password"
            onChange={(e) => setTogglePass(e.target.checked)}
          />
        </p>
        <input type={togglePass ? "text" : "password"} name="password" />
      </div>
      <p className="light-p">
        New User:{" "}
        <button type="button" onClick={() => setRegister(true)}>
          Register
        </button>
      </p>
      <input className="button" type="submit" value="Log in" />
    </form>
  );
};

const Register = ({ setRegister }) => {
  const passRef = useRef();
  const confirmPassRef = useRef();

  const [confirmPass, setConfirmPass] = useState(false);
  const [toggleConfirmPass, setToggleConfirmPass] = useState(false);
  const [togglePass, setTogglePass] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log("username:", e.target.elements.username.value);
    console.log("password:", e.target.elements.password.value);
    console.log("confirm password:", e.target.elements.confirm_password.value);

    const username = e.target.elements.username.value;
    const password = e.target.elements.password.value;
    const confirm_pass = e.target.elements.confirm_password.value;

    if (password !== confirm_pass) {
      console.error("Password not same");
      return;
    }

    if (!username || !password || !confirm_pass) {
      console.error("no value passed in username or password");
      return;
    }

    try {
      await axios.post(
        "https://socialmedia-mern-api.vercel.app/auth/register",
        {
          username,
          password,
        }
      );
      alert("Registeration completed, now login!");
      setRegister(false);
      setRegister;
    } catch (err) {
      console.error(err);
    }
  };

  const checkConfirmPass = (e) => {
    if (e.target.name === "password") {
      if (e.target.value === confirmPassRef.current.value) {
        console.log("same password");
        setConfirmPass(true);
      } else {
        setConfirmPass(false);
      }
    }
    if (e.target.name === "confirm_password") {
      if (e.target.value === passRef.current.value) {
        console.log("same password");
        setConfirmPass(true);
      } else {
        setConfirmPass(false);
      }
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h3>Register</h3>
      <div>
        <p>Username:</p>
        <input type="text" name="username" />
      </div>
      <div>
        <p>
          Password:{"  "}
          <input
            type="checkbox"
            name="toggle_password"
            onChange={(e) => setTogglePass(e.target.checked)}
          />
        </p>
        <input
          ref={passRef}
          type={togglePass ? "text" : "password"}
          onChange={checkConfirmPass}
          name="password"
        />
      </div>
      <div>
        <p>
          Confirm Password:{" "}
          <span style={{ color: "lightgreen" }}>{confirmPass && "✔  "}</span>
          <input
            type="checkbox"
            name="toggle_confirm_password"
            onChange={(e) => setToggleConfirmPass(e.target.checked)}
          />
        </p>
        <input
          type={toggleConfirmPass ? "text" : "password"}
          ref={confirmPassRef}
          onChange={checkConfirmPass}
          name="confirm_password"
        />
      </div>
      <p className="light-p">
        Account already created:{" "}
        <button type="button" onClick={() => setRegister(false)}>
          Login
        </button>
      </p>
      <input className="button" type="submit" value="Register" />
    </form>
  );
};
export default Auth;
