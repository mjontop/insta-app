import React from "react";
import style from "../styles/FullPageLoader.module.css";
const FullPageLoader = () => {
  return (
    <div className={style.main}>
      <div className={style.loader}>
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
