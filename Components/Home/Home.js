import React from "react";
import Posts from "../Post/Posts";

const Home = () => {
  return (
    <div
      className="d-flex flex-column"
      style={{ width: "100%", height: "100%" }}
    >
      <h2 className="text-purple">
        <strong>Explore Posts</strong>
      </h2>
      <Posts />
    </div>
  );
};

export default Home;
