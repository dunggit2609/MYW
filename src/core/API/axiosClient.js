import axios from "axios";
import AUTH from "constant/auth";


const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  params: {},
});

// Add a request interceptor
axiosClient.interceptors.request.use(async (config) => {
  const customHeaders = {};
  const header_token_name = AUTH.HEADER_TOKEN_NAME;
  const accessToken = localStorage.getItem(AUTH.TOKEN_KEY);
  if (!!accessToken) {
    customHeaders[header_token_name] = accessToken;
  }
  return {
    ...config,
    headers: {
      ...customHeaders, // auto attach token
      ...config.headers, // but you can override for some requests
    },
  };
});

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data.content;
  },
  function (error) {
    //parse error
    // const { config, status, data } = error.response;
    const URLS = {}; // link URLS apply this handle err
    return Promise.reject(error.response.data);
  }
);

export default axiosClient;
