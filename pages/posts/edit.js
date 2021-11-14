import { useRouter } from "next/router";
import React from "react";
import EditPost from "../../Components/Post/EditPost";

const EditPostpage = ({ profilePic }) => {
  const router = useRouter();
  const image = router.query.image;
  const captions = router.query.captions;
  const postId = router.query.postId;
  return (
    <EditPost
      profilePic={profilePic}
      image={image}
      captions={captions}
      postId={postId}
    />
  );
};

export default EditPostpage;
