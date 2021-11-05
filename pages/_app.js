import { useEffect, useState } from "react";
import getUserInfo from "../Components/auth";
import Navbar from "../Components/Navbar";
import "../styles/globals.css";
import Axios from "../utils/Axios";
import FullPageLoader from "../Components/FullPageLoader";
function MyApp({ Component, pageProps }) {
  const [profilePic, setProfilePic] = useState("");
  const [hasLoaded, setHasLoaded] = useState(false);
  const loadUser = async () => {
    const userInfo = getUserInfo();
    if (userInfo.isLoggedIn) {
      const { data } = await Axios.get(
        `/user/getEmailfromUsername/${userInfo.user.username}`
      );
      setProfilePic(data.imageBase64);
      setHasLoaded(true);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);
  if (!hasLoaded) {
    return <FullPageLoader />;
  }
  return (
    <>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1"
        crossOrigin="anonymous"
      />
      <Navbar profilePic={profilePic} />
      <Component {...pageProps} profilePic={profilePic} />
    </>
  );
}

export default MyApp;
