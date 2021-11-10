import React from "react";
import style from "../../styles/Post.module.css";
import FavoriteBorderRoundedIcon from "@material-ui/icons/FavoriteBorderRounded";

const Posts = () => {
  return (
    <div className={style.body}>
      <div className={style.user}>mjontop</div>
      <div className={style.post}>hey</div>
      <div className={style.user}>
        <FavoriteBorderRoundedIcon />
      </div>
    </div>
  );
};

export default Posts;
