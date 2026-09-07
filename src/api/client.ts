import axios from "axios";

const baseApi = import.meta.env.VITE_API_URL;
const apiClientWraper = axios.create({
  baseURL: baseApi,
  withCredentials: true,
});


export default apiClientWraper;
