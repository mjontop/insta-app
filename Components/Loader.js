import React from "react";
import style from "../styles/Loader.module.css";
const Loader = () => {
  return (
    <div class={style.spinner}>
      <div class={style.bounce1}></div>
      <div class={style.bounce2}></div>
      <div class={style.bounce3}></div>
    </div>
  );
};

export default Loader;
