import React, { useEffect, useState } from "react";

import getUsersEmail, { getUsersConnections } from "./ProfileHelper";
import style from "../../styles/Profile.module.css";
import NOTFOUND from "../NotFound";
import FullPageLoader from "../FullPageLoader";
import BasicPopover from "./BasicPopover";
import getUserInfo from "../auth";

const Profile = ({ username }) => {
  const [userData, setUserData] = useState({ data: {}, isLoading: false });
  const [userConnections, setUserConnections] = useState({
    followers: 0,
    following: 0,
    isLoading: false,
    error: false,
  });
  const [isSameUser, setIsSameUser] = useState(false);
  useEffect(() => {
    if (!!username) {
      setIsSameUser(getUserInfo().user.username === username);
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.replace("/");
  };

  if (userConnections.isLoading || userData.isLoading) {
    return <FullPageLoader />;
  }
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
              src={
                userData.data.imageBase64 !== ""
                  ? `data:image/png;base64,${userData.data.imageBase64}`
                  : "https://i.stack.imgur.com/l60Hf.png"
              }
            />
          </div>
        </div>
        <div className={style.userStats}>
          <div className={style.user_name_row}>
            <div className="px-2 fs-3">
              <strong>{username}</strong>
            </div>
            {!isSameUser ? (
              <div className="px-2">
                <button className="btn btn-secondary py-0">Follow</button>
              </div>
            ) : (
              <div className="px-2 cursor-ptr">
                <BasicPopover onClick={handleLogout} username={username} />
              </div>
            )}
          </div>
          <div className={style.stats_row}>
            <div className="px-2">
              <b>0</b> posts
            </div>
            <div className="px-4 cursor-ptr">
              <b>{userConnections.followers}</b> followers
            </div>
            <div className="px-4 cursor-ptr">
              <b>{userConnections.following}</b> following
            </div>
          </div>
          <div className={style.name_bio_row}>
            <div className="px-2">
              <strong>{userData.data.name}</strong>
            </div>
            <div className="px-2 mt-1">
              <p className="text-muted">{userData.data.bio}</p>
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
