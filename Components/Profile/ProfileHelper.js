import axios from "axios";

const getUsersEmail = async (username) => {
  console.log(username);
  try {
    const { data } = await axios.get(
      `http://localhost:8001/api/user/getEmailfromUsername/${username}`
    );
    return data;
  } catch (ex) {
    console.log("Error in Getting email");
  }
};

export default getUsersEmail;
