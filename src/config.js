import axios from "axios";
const accessToken = localStorage.getItem("token");
axios.defaults.baseURL = "http://127.0.0.1:8000/api";
axios.defaults.headers.common = { Authorization: `bearer ${accessToken}` };
export default axios;
