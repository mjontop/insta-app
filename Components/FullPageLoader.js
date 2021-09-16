import React from "react";
import style from "../styles/FullPageLoader.module.css";
const FullPageLoader = () => {
  return (
    <div class={style.main}>
      <div class={style.loader}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default FullPageLoader;
