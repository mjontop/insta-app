import React from "react";
import style from "../../styles/Post.module.css";
import FavoriteBorderRoundedIcon from "@material-ui/icons/FavoriteBorderRounded";

const Posts = ({ imgSrc }) => {
  return (
    <div className={style.body}>
      <div className={style.user}>mjontop</div>
      <div className={style.post}>
        <img className={style.postImg} src={imgSrc} />
      </div>
      <div className={style.user}>
        <FavoriteBorderRoundedIcon />
      </div>
    </div>
  );
};

export default Posts;
