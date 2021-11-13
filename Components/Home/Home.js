import React, { useEffect, useState } from "react";
import Posts from "../Post/Posts";
import getPhotosFromPexel from "./helper";
import Loader from "../Loader";

const Home = () => {
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    loadPhotos();
  }, []);
  const loadPhotos = async () => {
    setIsLoading(true);
    const data = await getPhotosFromPexel();
    setPhotos(data);
    setIsLoading(false);
  };
  return (
    <div
      className="d-flex flex-column mt-2"
      style={{ width: "100%", flex: "1" }}
    >
      <h2 className="text-purple">
        <strong>Explore Posts</strong>
      </h2>
      {photos.map((photo, index) => (
        <div className="py-4" key={index}>
          <Posts
            imgSrc={photo.src.large}
            username={photo.photographer_url.split("@")[1]}
          />
        </div>
      ))}
      {isLoading && (
        <div className="centered-div">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Home;
