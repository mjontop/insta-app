import React, { useEffect, useState } from "react";
import style from "../../styles/Post.module.css";
import FavoriteBorderRoundedIcon from "@material-ui/icons/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@material-ui/icons/FavoriteRounded";
import getUserInfo from "../auth";
import EditPopover from "./helper/EditPopover";
import { useRouter } from "next/dist/client/router";

const Posts = ({ imgSrc, username, profilePic, captions, id }) => {
  const [userInfo, setUserInfo] = useState({ isLoggedIn: false });
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    setUserInfo(getUserInfo());
  }, []);

  const handleLiked = (flag = false) => {
    if (!userInfo.isLoggedIn) return;
    if (!flag) {
      setLiked((prev) => !prev);
      return;
    }
    setLiked(true);
  };

  const router = useRouter();
  return (
    <div className={style.body}>
      <div className="d-flex justify-content-between align-items-center px-3">
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
        {userInfo.isLoggedIn && profilePic && (
          <EditPopover
            onClick={() => deletePost(id)}
            image={imgSrc}
            captions={captions}
            postId={id}
          />
        )}
      </div>

      <div className={style.post} onDoubleClick={() => handleLiked(true)}>
        <img className={style.postImg} src={imgSrc} />
      </div>
      <div className={style.user} onClick={handleLiked}>
        {!liked ? (
          <FavoriteBorderRoundedIcon />
        ) : (
          <FavoriteRoundedIcon className="text-purple" />
        )}
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
