import React, { useEffect, useState } from "react";
import navbar from "../styles/Navbar.module.css";
import Link from "next/link";
import getUserInfo from "./auth";
const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({
    username: "",
    email: "",
  });

  useEffect(() => {
    const userInfo = getUserInfo();
    setIsLoggedIn(userInfo.isLoggedIn);
    setUser(userInfo.user);
  }, []);

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
