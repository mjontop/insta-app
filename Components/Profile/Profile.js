import React, { useEffect, useState } from "react";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";

import getUsersEmail, { getUsersConnections } from "./ProfileHelper";
import style from "../../styles/Profile.module.css";

const Profile = ({ username }) => {
  const [userEmail, setUserEmail] = useState({ data: null, isLoading: false });
  const [userConnections, setUserConnections] = useState({
    followers: 0,
    following: 0,
    isLoading: false,
  });
  useEffect(() => {
    if (!!username) {
      setUserEmail({ ...userEmail, isLoading: true });
      setUserConnections({ ...userConnections, isLoading: true });
      getUsersEmail(username).then(({ error, ...data }) => {
        if (!error) {
          setUserEmail({ data, isLoading: false });
          getUsersConnections(data.email).then((data) => {
            if (!data.error) {
              setUserConnections({
                followers: data.followers,
                following: data.following,
                isLoading: false,
              });
            }
          });
          return;
        }
        setUserEmail((prev) => ({ ...prev, isLoading: false }));
        setUserConnections((prev) => ({ ...prev, isLoading: false }));
        return;
      });
    }
  }, [username]);
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
            <div className="px-4 cursor-ptr">1 followers</div>
            <div className="px-4 cursor-ptr">1 following</div>
          </div>
          <div className={style.name_bio_row}>
            <div className="px-2">
              <p>Name</p>
            </div>
            <div className="px-2">
              <p>Bio</p>
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
