import axios from "axios";

const Axios = axios.create({
  baseURL: "http://localhost:8001/api",
  // headers: { "X-Custom-Header": "foobar" },
});

export default Axios;
