import React, { useEffect, useState } from "react";
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
              className="rounded"
              width="150"
              height="150"
              src="https://i.stack.imgur.com/l60Hf.png"
            />
          </div>
        </div>
        <div className={style.userStats}></div>
      </div>
      <div className={style.posts}>dfasdfasdfa</div>
    </main>
  );
};

export default Profile;
