import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import style from "../../styles/SignIn.module.css";
import Loader from "../Loader";

const SignIn = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    isLoading: false,
  });

  const handleChange = (name) => (e) => {
    setUserInfo((prev) => ({ ...prev, [name]: e.target.value }));
  };

  return (
    <main className="main">
      <div className={style.container}>
        <div className={style.login_body}>
          <p className="fs-1 text-center">
            <strong>Welcome</strong>
          </p>
          <div className={style.login_inputs}>
            <TextField
              id="standard-error-helper-text"
              label="Email or Username"
              variant="standard"
              className="mb-4"
              onChange={handleChange("email")}
            />
            <TextField
              id="standard-error-helper-text"
              label="Password"
              variant="standard"
              type="password"
              onChange={handleChange("password")}
            />
          </div>
          <div className={style.login_btn}>
            {!userInfo.isLoading ? (
              <button className="btn btn-secondary">Login</button>
            ) : (
              <Loader />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignIn;
