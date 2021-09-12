import axios from "axios";

const Axios = axios.create({
  baseURL: "http://localhost:8001/api",
  // headers: { "X-Custom-Header": "foobar" },
});

export const parseJwt = (token) => {
  try {
    return JSON.parse(window.atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

export default Axios;
