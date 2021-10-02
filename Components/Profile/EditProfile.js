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

  const handleImageUpload = (e) => {
    const file = document.querySelector("input[type=file]")["files"][0];
    let base64String = "";
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
      setUserData((prev) => ({
        ...prev,
        data: { ...prev.data, imageBase64: base64String },
      }));
    };
  };

  const handleSave = () => {
    const { bio, name, username, imageBase64 } = userData.data;
    setIsLoading(true);
    updateUserProfile({ bio, name, username, imageBase64 }).then(
      ({ error, token }) => {
        if (!error) {
          localStorage.setItem("token", token);
        }
        setIsLoading(false);
      }
    );
  };

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
          <div className="centered-div ">
            <label htmlFor="img">
              <div className={style.img_container}>
                <div className="d-none">
                  <input
                    type="file"
                    id="img"
                    name="img"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e)}
                  />
                </div>
                <div
                  className={"circle " + style.edit_profile_pic}
                  style={
                    userData.data.imageBase64
                      ? {
                          backgroundImage: `url(data:image/png;base64,${userData.data.imageBase64})`,
                        }
                      : {}
                  }
                >
                  <div className={style.middle}>
                    <div className={style.text}>
                      <CameraAlt />
                    </div>
                  </div>
                </div>
              </div>
            </label>
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
