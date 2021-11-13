import Axios from "../../../utils/Axios";

const getPost = async (postId) => {
  try {
    const { data } = await Axios.get(`post/${postId}`);
    if (data.error) {
      return {
        error: true,
        data: {},
      };
    }
    return {
      error: false,
      data: data.post,
    };
  } catch (ex) {
    console.log("Error in getting Post", ex);
    return {
      error: true,
      data: {},
    };
  }
};

export const getUserFromEmail = async (email) => {
  try {
    const { data } = await Axios.get(`/user/getUserFromEmail/${email}`);
    return data;
  } catch (ex) {
    console.log("Error in Getting email");
    return {
      error: true,
      data: null,
    };
  }
};

export default getPost;
