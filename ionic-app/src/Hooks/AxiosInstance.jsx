import axios from "axios";
import React from "react";

const axiosInstance = axios.create({
  baseURL: `https://zap-server-ten.vercel.app/`,
});

const AxiosInstance = () => {
  return axiosInstance;
};

export default AxiosInstance;
