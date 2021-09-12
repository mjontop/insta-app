import React from "react";
import navbar from "../styles/Navbar.module.css";
import Link from "next/link";
const Navbar = () => {
  return (
    <>
      <header className={navbar.body}>
        <div className={navbar.container}>
          <div className={navbar.main}>
            <Link href="/">
              <div className="cursor-ptr">
                <i>HOME</i>
              </div>
            </Link>
            <div>
              <input className={navbar.input} placeholder="Search" />
            </div>
            <Link href="/profile">
              <div className="cursor-ptr">
                <img
                  src="https://img-premium.flaticon.com/png/512/552/premium/552848.png?token=exp=1631388468~hmac=b3061e9fc90e9afde8381e20fc0901bd"
                  width="25"
                />
              </div>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
