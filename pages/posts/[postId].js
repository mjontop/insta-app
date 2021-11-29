import React, { useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import Posts from "../../Components/Post/Posts";
import Loader from "../../Components/Loader";
import getPost, { getUserFromEmail } from "../../Components/Post/helper/getPost";
import NOTFOUND from "../../Components/NotFound";
const Post = () => {
  const [post, setPost] = useState({});
  const [author, setAuthor] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const router = useRouter();
  const postId = router.query.postId;
  useEffect(() => {
    if (postId) {
      handleGetPost();
    }
  }, [postId]);
  const handleGetPost = async () => {
    setLoading(true);
    const { data, error } = await getPost(postId);
    if (error) {
      setHasError(true);
      return;
    }
    setPost(data);
    await getUsersDetails(data.postedBy);
    setLoading(false);
  };

  const getUsersDetails = async (email) => {
    const data = await getUserFromEmail(email);
    setAuthor(data);
  };

  if (hasError) {
    return <NOTFOUND message={`Oops! Looks Like Post isn't Available`} />;
  }

  return (
    <main className="main">
      {!isLoading ? (
        <Posts
          imgSrc={`data:image/png;base64,${post.imageBase64}`}
          username={author.username}
          profilePic={author.imageBase64}
          captions={post.captions}
          id={post._id}
        />
      ) : (
        <Loader />
      )}
    </main>
  );
};

export default Post;
