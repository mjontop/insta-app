import React, { useEffect, useState } from "react";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";

import getUsersEmail, { getUsersConnections } from "./ProfileHelper";
import style from "../../styles/Profile.module.css";
import NOTFOUND from "../NotFound";

const Profile = ({ username }) => {
  const [userData, setUserData] = useState({ data: {}, isLoading: false });
  const [userConnections, setUserConnections] = useState({
    followers: 0,
    following: 0,
    isLoading: false,
    error: false,
  });
  useEffect(() => {
    if (!!username) {
      setUserData({ ...userData, isLoading: true });
      setUserConnections({ ...userConnections, isLoading: true });
      getUsersEmail(username).then(({ error, ...data }) => {
        if (!error) {
          setUserData({ data, isLoading: false });
          getUsersConnections(data.email).then((data) => {
            if (!data.error) {
              setUserConnections({
                followers: data.followers,
                following: data.following,
                isLoading: false,
                error: false,
              });
            }
          });
          return;
        }
        setUserData((prev) => ({ ...prev, isLoading: false }));
        setUserConnections((prev) => ({
          ...prev,
          isLoading: false,
          error: true,
        }));
        return;
      });
    }
  }, [username]);
  if (userConnections.error) {
    return <NOTFOUND />;
  }
  return (
    <main className="main">
      <div className={style.header}>
        <div className={style.profilePic}>
          <div className="centered-div">
            <img
              className="circle"
              width="150"
              height="150"
              src="https://i.stack.imgur.com/l60Hf.png"
            />
          </div>
        </div>
        <div className={style.userStats}>
          <div className={style.user_name_row}>
            <div className="px-2 fs-3">
              <strong>{username}</strong>
            </div>
            <div className="px-2">
              <button className="btn btn-secondary py-0">Follow</button>
            </div>
            <div className="px-2 cursor-ptr">
              <SettingsOutlinedIcon />
            </div>
          </div>
          <div className={style.stats_row}>
            <div className="px-2">0 posts</div>
            <div className="px-4 cursor-ptr">
              {userConnections.followers} followers
            </div>
            <div className="px-4 cursor-ptr">
              {userConnections.following} following
            </div>
          </div>
          <div className={style.name_bio_row}>
            <div className="px-2">
              <p>{userData.data.name}</p>
            </div>
            <div className="px-2">
              <p>{userData.data.bio}</p>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className={style.posts}>
        <div className={style.posts_Items}></div>
        <div className={style.posts_Items}></div>
        <div className={style.posts_Items}></div>
      </div>
    </main>
  );
};

export default Profile;
