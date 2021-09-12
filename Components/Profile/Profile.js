import React, { useEffect, useState } from "react";
import getUsersEmail, { getUsersConnections } from "./ProfileHelper";

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
    <>
      <h1>Hey {username}</h1>
      {JSON.stringify(userEmail)}
      {JSON.stringify(userConnections)}
    </>
  );
};

export default Profile;
