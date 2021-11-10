import React from "react";
import { useRouter } from "next/dist/client/router";

const Post = () => {
  const router = useRouter();
  const postId = router.query.postId;
  return "postId " + postId;
};

export default Post;
