import React, { useEffect, useState } from "react";

import getUsersEmail from "./ProfileHelper";
import NOTFOUND from "../NotFound";
import FullPageLoader from "../FullPageLoader";
import getUserInfo from "../auth";
import style from "../../styles/EditProfile.module.css";
const EditProfile = ({ username }) => {
  const [userData, setUserData] = useState({ data: {}, isLoading: false });

  const [isSameUser, setIsSameUser] = useState(false);
  useEffect(() => {
    if (!!username) {
      setIsSameUser(getUserInfo().user.username === username);
      setUserData({ ...userData, isLoading: true });
      getUsersEmail(username).then(({ error, ...data }) => {
        if (!error) {
          setUserData({ data, isLoading: false });
          return;
        }
        setUserData((prev) => ({ ...prev, isLoading: false }));
        return;
      });
    }
  }, [username]);

  if (userData.isLoading) {
    return <FullPageLoader />;
  }
  if (!isSameUser) {
    return <NOTFOUND />;
  }
  return (
    <main className="main">
      <div className={style.body}>
        <div className={style.left}>
          <div className="centered-div">
            <img
              className="circle"
              width="200"
              height="200"
              src="https://i.stack.imgur.com/l60Hf.png"
            />
          </div>
        </div>
        <div className={style.right}>
          <div className={style.heading}>
            <strong className="fs-1">Edit Profile</strong>
          </div>
          <div className={style.form_feilds}></div>
          <div className={style.save_button}>
            <button className="btn">Save</button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default EditProfile;
