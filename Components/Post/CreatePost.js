import React, { useEffect, useState } from "react";
import { BackupRounded, ClearRounded } from "@material-ui/icons";
import { Button, Input } from "@material-ui/core";
import style from "../../styles/CreatePost.module.css";
import createNewPost from "./helper";
import Loader from "../Loader";
import { useRouter } from "next/router";
const CreatePost = ({ profilePic }) => {
  const [imageUploaded, setImgUploaded] = useState(null);
  const [caption, setCaption] = useState("");
  const [imageBase64, setImageBase64] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleImageUpload = (e) => {
    console.log(Array.from(e.target.files));
    const file = e.target.files[0];
    setImgUploaded(URL.createObjectURL(file));
    let base64String = "";
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
      setImageBase64(base64String);
    };
  };

  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
  };

  const handleCreatePost = () => {
    const body = {
      imageBase64,
      captions: caption,
    };
    setIsLoading(true);
    createNewPost(body).then((data) => {
      if (!data.error) {
        router.push(`/posts/${data.postId}`);
      }
      setIsLoading(false);
    });
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
              {!isLoading ? (
                <Button
                  variant="contained"
                  component="span"
                  className="btn"
                  size="large"
                  onClick={handleCreatePost}
                >
                  Share
                </Button>
              ) : (
                <Loader />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatePost;
