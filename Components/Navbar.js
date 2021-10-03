import React, { useEffect, useState } from "react";
import navbar from "../styles/Navbar.module.css";
import Link from "next/link";
import getUserInfo from "./auth";
const Navbar = () => {
  const [showShadow, setShowShadow] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({
    username: "",
    email: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    const userInfo = getUserInfo();
    setIsLoggedIn(userInfo.isLoggedIn);
    setUser(userInfo.user);
    window.addEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    if (window.scrollY > 10) {
      setShowShadow(true);
      return;
    } else {
      setShowShadow(false);
    }
  };

  return (
    <>
      <header
        className={navbar.body}
        style={showShadow ? { position: "fixed" } : {}}
      >
        <div
          className={
            showShadow
              ? `${navbar.container} ${navbar.shadow}`
              : `${navbar.container}`
          }
        >
          <div className={navbar.main}>
            <Link href="/">
              <div className="cursor-ptr">
                <i>HOME</i>
              </div>
            </Link>
            <div>
              <input className={navbar.input} placeholder="Search" />
            </div>
            <div className="cursor-ptr">
              {isLoggedIn ? (
                <Link href={`/${user.username}`}>
                  <img
                    className="circle"
                    width="25"
                    height="25"
                    src="https://i.stack.imgur.com/l60Hf.png"
                  />
                </Link>
              ) : (
                <div className="d-flex align-items-center">
                  <Link href="/accounts/login">
                    <button className="mx-2 btn">Login</button>
                  </Link>
                  <Link href="/accounts/register">
                    <strong className="text-purple ">Register</strong>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
