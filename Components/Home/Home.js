import React, { useEffect, useState } from "react";
import Posts from "../Post/Posts";
import getPhotosFromPexel from "./helper";

const Home = () => {
  const [photos, setPhotos] = useState([]);
  useEffect(() => {
    loadPhotos();
  }, []);
  const loadPhotos = async () => {
    const data = await getPhotosFromPexel();
    setPhotos(data);
  };
  return (
    <div
      className="d-flex flex-column"
      style={{ width: "100%", height: "100%" }}
    >
      <h2 className="text-purple">
        <strong>Explore Posts</strong>
      </h2>
      {photos.map((photo) => (
        <div className="py-4">
          <Posts imgSrc={photo.src.large} />
        </div>
      ))}
    </div>
  );
};

export default Home;
