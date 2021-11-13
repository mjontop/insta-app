import React from "react";
import style from "../../styles/Post.module.css";
import FavoriteBorderRoundedIcon from "@material-ui/icons/FavoriteBorderRounded";
import { useRouter } from "next/router";

const Posts = ({ imgSrc, username, profilePic, captions }) => {
  const router = useRouter();
  return (
    <div className={style.body}>
      <div className="d-flex align-items-center px-3">
        <img
          className="circle"
          width="35"
          height="35"
          src={
            !profilePic || profilePic === ""
              ? "https://i.stack.imgur.com/l60Hf.png"
              : `data:image/png;base64,${profilePic}`
          }
        />
        <div
          className={style.user}
          onClick={() => {
            if (profilePic) router.push(`/${username}`);
          }}
        >
          {username}
        </div>
      </div>
      <div className={style.post}>
        <img className={style.postImg} src={imgSrc} />
      </div>
      <div className={style.user}>
        <FavoriteBorderRoundedIcon />
      </div>
      {captions && (
        <div className="px-3 d-flex">
          <b>{username} &nbsp;&nbsp;</b>
          {captions}
        </div>
      )}
    </div>
  );
};

export default Posts;
