import React, { useEffect, useState } from "react";
import { getUsersPost } from "./helper";
import Loader from "../Loader";
const AllPosts = ({ email }) => {
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
        return;
      }
      setPosts({
        hasLoaded: true,
        data: [],
      });
    });
  };

  useEffect(() => {
    if (email) handleUsersPosts(email);
  }, [email]);

  return (
    <div
      style={{
        flex: "10",
        width: "100%",
        paddingTop: "2rem",
      }}
      className="row"
    >
      {posts.hasLoaded ? (
        <>
          {posts.data.map((post, index) => (
            <div
              key={index}
              className="col-12 col-md-4"
              style={{ maxHeight: "300px" }}
            >
              <img
                src={`data:image/png;base64,${post.imageBase64}`}
                className="w-100 img-fluid"
              />
            </div>
          ))}
        </>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Loader />
        </div>
      )}
    </div>
  );
};

export default AllPosts;
