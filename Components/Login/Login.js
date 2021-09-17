import React from "react";
import { makeStyles, TextField } from "@material-ui/core";
import style from "../../styles/SignIn.module.css";

const SignIn = () => {
  return (
    <main className="main">
      <div className={style.container}>
        <div className={style.login_body}>
          <p className="fs-1 text-center">
            <strong>Welcome</strong>
          </p>
          <div className={style.login_inputs}>
            <TextField
              error={false}
              id="standard-error-helper-text"
              label="Email"
              defaultValue="Hello World"
              helperText="Incorrect entrydasdf."
              variant="standard"
            />
            <TextField
              error={false}
              id="standard-error-helper-text"
              label="Password"
              defaultValue="Hello World"
              helperText="Incorrect entrydasdf."
              variant="standard"
              type="password"
            />
          </div>
          <div className={style.login_btn}>
            <button className="btn btn-secondary">Login</button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignIn;
