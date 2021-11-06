import Axios from "../../../utils/Axios";
const createNewPost = async (body) => {
  try {
    const { data } = await Axios.post("/post/createPost", body);
    if (!data.error) {
      return { error: false, postId: data.postId };
    }
    return { error: true, postId: null };
  } catch (ex) {
    console.log("Error in Creating Post", ex);
    return { error: true, postId: null };
  }
};

export default createNewPost;
