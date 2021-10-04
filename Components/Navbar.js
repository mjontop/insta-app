import React, { useEffect, useState } from "react";
import navbar from "../styles/Navbar.module.css";
import Link from "next/link";
import getUserInfo from "./auth";
import { Autocomplete } from "@material-ui/lab/";
import axios from "axios";
import Axios from "../utils/Axios";
import { TextField } from "@material-ui/core";
import { useRouter } from "next/dist/client/router";
const Navbar = () => {
  const [showShadow, setShowShadow] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({
    username: "",
    email: "",
  });
  const [searchResults, setSearchResults] = useState({
    data: [],
    isLoading: false,
  });
  const router = useRouter();
  let cancelToken;
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

  const handleSearch = async (e) => {
    if (e.target.value.trim() === "") {
      setSearchResults({ data: [], isLoading: false });
      return;
    }
    if (typeof cancelToken != typeof undefined) {
      cancelToken.cancel("closing prev call");
    }

    cancelToken = axios.CancelToken.source();

    let value = e.target.value;
    setSearchResults((prev) => ({ ...prev, isLoading: true }));
    const { data } = await Axios.get(`user/searchUser/${value}`, {
      cancelToken: cancelToken.token,
    });
    let searchResultObj = data.users.map((user) => ({ title: user, year: 1 }));
    setSearchResults({ data: searchResultObj, isLoading: false });
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
            <div style={{ width: "30%" }}>
              <Autocomplete
                freeSolo
                id="free-solo-2-demo"
                disableClearable
                options={searchResults.data.map((option) => option.title)}
                loading={searchResults.isLoading}
                onChange={(event, value) => {
                  router.push(`/${value}`)
                }}
                renderInput={(params) => (
                  <TextField
                    className="inputRounded"
                    placeholder="Search"
                    variant="outlined"
                    size="small"
                    {...params}
                    InputProps={{
                      ...params.InputProps,
                      type: "search",
                    }}
                    onChange={handleSearch}
                  />
                )}
              />
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
