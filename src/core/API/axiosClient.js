import { environment } from "assets/environment/environment";
import axios from "axios";
import AUTH from "constant/auth";

const axiosClient = axios.create({
  baseURL: environment.baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  async (config) => {
    const customHeaders = {};
  
    const accessToken = localStorage.getItem(AUTH.ACCESS_TOKEN);
    if (accessToken) {
      customHeaders.Authorization = accessToken;
    }
  
    return {
      ...config,
      headers: {
        ...customHeaders,  // auto attach token
        ...config.headers, // but you can override for some requests
      }
    };
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    //parse error
    const { config, status, data } = error.response;
    const URLS = {}; // link URLS apply this handle err
    return Promise.reject(error);
  }
);

export default axiosClient;
