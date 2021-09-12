import Axios from "../../utils/Axios";

const getUsersEmail = async (username) => {
  try {
    const { data } = await Axios.get(`/user/getEmailfromUsername/${username}`);
    return data;
  } catch (ex) {
    console.log("Error in Getting email");
    return {
      error: true,
      data: null,
    };
  }
};

export const getUsersConnections = async (email) => {
  try {
    const { data } = await Axios.post(`/connections/getAllConnectionsCount`, {
      email,
    });
    return data;
  } catch (ex) {
    console.log("Error in Getting Followers");
    return {
      error: true,
      data: null,
    };
  }
};

export default getUsersEmail;
