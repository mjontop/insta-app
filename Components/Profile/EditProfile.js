import React, { useEffect, useState } from "react";

import getUsersEmail from "./ProfileHelper";
import NOTFOUND from "../NotFound";
import FullPageLoader from "../FullPageLoader";
import getUserInfo from "../auth";

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
      {JSON.stringify(userData)}
      <img
        className="circle"
        width="150"
        height="150"
        src="https://i.stack.imgur.com/l60Hf.png"
      />
    </main>
  );
};

export default EditProfile;
