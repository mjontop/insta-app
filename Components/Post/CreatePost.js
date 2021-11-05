import React, { useState } from "react";
import { BackupRounded, ClearRounded } from "@material-ui/icons";
import { Button, Input } from "@material-ui/core";
import style from "../../styles/CreatePost.module.css";
const CreatePost = ({ profilePic }) => {
  const [imageUploaded, setImgUploaded] = useState(null);
  const [caption, setCaption] = useState("");
  const handleImageUpload = (e) => {
    console.log(Array.from(e.target.files));
    setImgUploaded(URL.createObjectURL(event.target.files[0]));
  };

  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
  };

  return (
    <div className="main">
      <div className={style.body}>
        <div className={style.heading}>
          <strong className="text-center w-100 fs-1">Create new post</strong>
          <hr />
        </div>
        <div className={style.dragdrop}>
          {imageUploaded && (
            <div className={style.image}>
              <img className={style.img_uploaded} src={imageUploaded} />
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
                onChange={handleImageUpload}
              />
              <Button
                variant="contained"
                component="span"
                className="btn"
                size="large"
              >
                Upload From Device <BackupRounded />
              </Button>
            </label>
          )}
        </div>
        {!!imageUploaded && (
          <div className={style.footer}>
            <div className={style.userImage}>
              <img
                src={
                  profilePic === ""
                    ? "https://i.stack.imgur.com/l60Hf.png"
                    : `data:image/png;base64,${profilePic}`
                }
                height="150"
                width="150"
              />
            </div>
            <div className={style.captions}>
              <textarea
                placeholder="Write Something about Photo!"
                maxLength="120"
                className={style.captionText}
                value={caption}
                onChange={handleCaptionChange}
              />
              <span>{caption.length}/120</span>
              <Button
                variant="contained"
                component="span"
                className="btn"
                size="large"
              >
                Share
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatePost;
