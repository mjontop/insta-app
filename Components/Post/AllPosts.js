import React, { useEffect, useState } from "react";
import { getUsersPost } from "./helper";
import Loader from "../Loader";
import style from "../../styles/AllPosts.module.css";

const AllPosts = ({ email, postCountUpdater }) => {
  const [posts, setPosts] = useState({
    hasLoaded: false,
    data: [],
  });
  const handleUsersPosts = (email) => {
    getUsersPost(email).then(({ data, error }) => {
      if (!error) {
        setPosts({
          hasLoaded: true,
          data,
        });
        sessionStorage.setItem("allPosts", JSON.stringify(data));
        postCountUpdater(data.length);
        return;
      }
      setPosts({
        hasLoaded: true,
        data: [],
      });
    });
  };

  useEffect(() => {
    const allPosts = JSON.parse(sessionStorage.getItem("allPosts"));
    if (allPosts) {
      setPosts({
        hasLoaded: true,
        data: allPosts,
      });
      postCountUpdater(allPosts.length);
      return;
    }
    if (email && !allPosts) handleUsersPosts(email);
  }, [email]);

  return (
    <div className={`row ${style.container}`}>
      {posts.hasLoaded ? (
        <>
          {posts.data.map((post, index) => (
            <div
              key={index}
              className={`col-12 col-md-4 ${style.imgs}`}
              style={{
                backgroundImage: `url('data:image/png;base64,${post.imageBase64}')`,
              }}
            ></div>
          ))}
        </>
      ) : (
        <div className={style.loader}>
          <Loader />
        </div>
      )}
    </div>
  );
};

export default AllPosts;
