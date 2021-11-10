const getPhotosFromPexel = async () => {
  try {
    const res = await fetch(
      "https://api.pexels.com/v1/search?query=people&orientation=landscape",
      {
        headers: {
          Authorization:
            "563492ad6f91700001000001591b54b929d4423a9e26a07fe3268bf4",
        },
      }
    );
    const data = await res.json();
    return data.photos;
  } catch (ex) {
    console.log("Cannot Load photo from pexel");
    return [];
  }
};

export default getPhotosFromPexel;
