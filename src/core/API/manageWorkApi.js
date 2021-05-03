import axiosClient from "./axiosClient";

const url = "/boards";
const manageWorkApi = {
  getAllWorkSpaces(params) {
    
    return axiosClient.get(url, { params: params });
  },
  postNewWorkSpace(data) {
    return axiosClient.post(url, data);
  },
  //api getToken, api get user
};

export default manageWorkApi;
