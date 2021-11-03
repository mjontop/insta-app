import React, { useState } from "react";
import { BackupRounded, ClearRounded } from "@material-ui/icons";
import { Button, Input } from "@material-ui/core";
import style from "../../styles/CreatePost.module.css";
const CreatePost = () => {
  const [imageUploaded, setImgUploaded] = useState(null);
  const handleChange = (e) => {
    console.log(Array.from(e.target.files));
    setImgUploaded(URL.createObjectURL(event.target.files[0]));
  };

  return (
    <div className="main">
      <div className={style.body}>
        <div className={style.heading}>
          <strong className="text-center w-100 fs-1">Create New Post</strong>
        </div>
        <div className={style.dragdrop}>
          {imageUploaded && (
            <div className={style.image}>
              <img src={imageUploaded} width="400" height="500" />
              <ClearRounded
                style={{ color: "red", background: "lightsalmon" }}
                className="cursor-ptr"
                onClick={() => setImgUploaded("")}
              />
            </div>
          )}
          {!imageUploaded && (
            <label htmlFor="contained-button-file">
              <Input
                accept="image/*"
                id="contained-button-file"
                type="file"
                className="d-none"
                onChange={handleChange}
              />
              <Button variant="contained" component="span" className="btn" size="large">
                Upload <BackupRounded />
              </Button>
            </label>
          )}
        </div>
        <div className={style.footer}></div>
      </div>
    </div>
  );
};

export default CreatePost;
