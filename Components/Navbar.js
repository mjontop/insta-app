import React from "react";
import navbar from "../styles/Navbar.module.css";
const Navbar = () => {
  return (
    <div className={navbar.body}>
      <header className={navbar.container}>
        <div className={navbar.main}>
          <div>
            <i>HOME</i>
          </div>
          <div>
            <input className={navbar.input} placeholder="Search" />
          </div>
          <div className="cursor-ptr">
            <img
              src="https://img-premium.flaticon.com/png/512/552/premium/552848.png?token=exp=1631388468~hmac=b3061e9fc90e9afde8381e20fc0901bd"
              width="25"
            />
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
