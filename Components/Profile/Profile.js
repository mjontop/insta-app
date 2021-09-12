import React, { useEffect } from "react";
import getUsersEmail from "./ProfileHelper";

const Profile = ({ username }) => {
  useEffect(() => {
    if (!!username) getUsersEmail(username);
  }, [username]);
  return <h1>Hey {username}</h1>;
};

export default Profile;
