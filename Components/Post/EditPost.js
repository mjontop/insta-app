import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import style from "../../styles/CreatePost.module.css";
import createNewPost, { updatePost } from "./helper";
import Loader from "../Loader";
import { useRouter } from "next/router";
const EditPost = ({ profilePic, image, captions, postId }) => {
  const [caption, setCaption] = useState("");
  const [imageBase64, setImageBase64] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setImageBase64(image);
    setCaption(captions);
  }, [image]);

  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
  };

  const handleEditPost = () => {
    setIsLoading(true);
    updatePost(caption, postId).then((data) => {
      if (!data.error) {
        router.push(`/posts/${postId}`);
      }
      setIsLoading(false);
    });
  };

  return (
    <div className="main">
      <div className={style.body}>
        <div className={style.heading}>
          <strong className="text-center w-100 fs-1">Edit Post</strong>
          <hr />
        </div>
        <div className={style.dragdrop}>
          <div className={style.image}>
            <img className={style.img_uploaded} src={imageBase64} />
          </div>
        </div>
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
                onClick={handleEditPost}
              >
                Share
              </Button>
            ) : (
              <Loader />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPost;
