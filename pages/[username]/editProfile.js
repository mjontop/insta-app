import { useRouter } from "next/dist/client/router";
import React from "react";
import EditProfile from "../../Components/Profile/EditProfile";

const EditProfileRoute = () => {
  const router = useRouter();
  const username = router.query.username;
  return <EditProfile username={username} />;
};

export default EditProfileRoute;
