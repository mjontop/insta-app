import Axios from "../../../utils/Axios";

const getFollowers = async (email) => {
  try {
    const { data } = await Axios.post("/connections/getAllFollowers", {
      email,
    });
    return {
      data: data.followers,
      error: false,
    };
  } catch (ex) {
    console.log("Error in Getting Followers", ex);
    return {
      error: true,
      data: ex.response.data,
    };
  }
};

export const getFollowings = async (email) => {
  try {
    const { data } = await Axios.post("/connections/getAllFollowees", {
      email,
    });
    return {
      data: data.followees,
      error: false,
    };
  } catch (ex) {
    console.log("Error in Getting Followers", ex);
    return {
      error: true,
      data: ex.response.data,
    };
  }
};

export const toggleFollowers = async (username) => {
  try {
    const { error } = await Axios.post(`/connections/toggleFollow`, {
      username,
    });
    return { error };
  } catch (ex) {
    console.log("Error in Toggle Follow", ex);
    return { error: true };
  }
};

export default getFollowers;
