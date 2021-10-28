import React from "react";
import style from "../../styles/CreatePost.module.css";
const CreatePost = () => {
  return (
    <div className="main">
      <div className={style.body}>
        <strong className="text-center w-100 fs-1">Create New Post</strong>
        <div>upload</div>
      </div>
    </div>
  );
};

export default CreatePost;
