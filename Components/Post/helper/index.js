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

export const deletePost = async (postId) => {
  try {
    const { data } = await Axios.post(`post/deletePost/${postId}`);
    return data;
  } catch (ex) {
    console.log("Cannot Delete Post", ex);
    return {
      data: null,
      error: true,
    };
  }
};

export const getUsersPost = async (email) => {
  try {
    const { data } = await Axios.post("/post/all", {
      email,
    });
    if (!data.error) {
      return {
        error: false,
        data: data.posts,
      };
    }
    return {
      error: true,
      data: [],
    };
  } catch (ex) {
    console.log("Error in getting Posts");
    return {
      error: true,
      data: [],
    };
  }
};

export default createNewPost;
