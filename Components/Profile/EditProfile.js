import React, { useEffect, useState } from "react";
import { TextField } from "@material-ui/core";
import getUsersEmail, { updateUserProfile } from "./ProfileHelper";
import NOTFOUND from "../NotFound";
import FullPageLoader from "../FullPageLoader";
import getUserInfo from "../auth";
import style from "../../styles/EditProfile.module.css";
import Loader from "../Loader";
import { CameraAlt } from "@material-ui/icons";

const EditProfile = ({ username }) => {
  const [userData, setUserData] = useState({ data: {}, isLoading: false });
  const [isSameUser, setIsSameUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleChange = (e, name) => {
    setUserData({
      ...userData,
      data: { ...userData.data, [name]: e.target.value },
    });
  };

  const handleSave = () => {
    const { bio, name, username } = userData.data;
    setIsLoading(true);
    updateUserProfile({ bio, name, username }).then(({ error, token }) => {
      if (!error) {
        localStorage.setItem("token", token);
      }
      setIsLoading(false);
    });
  };

  if (userData.isLoading) {
    return <FullPageLoader />;
  }
  if (!isSameUser) {
    return <NOTFOUND />;
  }
  return (
    <main className="main">
      {JSON.stringify(userData)}
      <div className={style.body}>
        <div className={style.left}>
          <div className="centered-div ">
            <div className={style.img_container}>
              <div
                className={"circle " + style.edit_profile_pic}
                style={{
                  backgroundImage: "url('https://i.stack.imgur.com/l60Hf.png')",
                  backgroundSize: "200px 200px",
                  width: "200px",
                  height: "200px",
                }}
              >
                <div className={style.middle}>
                  <div className={style.text}>
                    <CameraAlt />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={style.right}>
          <div className={style.heading}>
            <strong className="fs-1">Edit Profile</strong>
          </div>
          <div className={style.form_feilds}>
            <TextField
              label="Email"
              variant="filled"
              disabled={true}
              value={userData.data.email}
            />
            <TextField
              label="Name"
              variant="filled"
              value={userData.data.name}
              onChange={(e) => handleChange(e, "name")}
            />
            <TextField
              label="username"
              variant="filled"
              value={userData.data.username}
              onChange={(e) => handleChange(e, "username")}
            />
            <TextField
              label="Bio"
              variant="filled"
              value={userData.data.bio}
              onChange={(e) => handleChange(e, "bio")}
            />
          </div>
          <div className={style.save_button}>
            {!isLoading ? (
              <button className="btn btn-blocl" onClick={handleSave}>
                Save
              </button>
            ) : (
              <Loader />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default EditProfile;
