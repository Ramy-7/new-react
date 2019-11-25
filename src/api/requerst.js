import axios from "axios";
import { message } from "antd";
import codeMessage from "../config/code-message";

const axiosInstance = axios.create({
  beseURL: "http://localhost:5000/api",
  timeout: 10000, //超时中断
  headers: {
    //能写死的公共请求参数，活动的不写
  }
});
// 拦截器
axiosInstance.interceptors.request.use(
  config => {
    if (config.method === "post") {
      config.headers["content-type"] = "application/x-www-form-urlencoded";
      config.data = Object.keys(config.data)
        .reduce((prev, key) => {
          const value = config.data[key];
          return prev + `&${key}=${value}`;
        }, "")
        .substring(1);
    }

    const token = ""; //???

    if (token) {
      config.headers.authorization = "Bearer" + token;
    }

    return config;
  },
  axiosInstance.interceptors.request.use(
    ({ data }) => {
      if (data.status === 0) {
        return data.data;
      } else {
        message.error(data.msg);
        return Promise.reject(data.msg);
      }
    },
    error => {
      let errorMessage = "";

      if (error.response) {
        errorMessage = codeMessage[error.response.status] || "未知错误";
      } else {
        if (error.message.indexOf("Network Error") !== -1) {
          errorMessage = "没网";
        } else if (error.message.indexOf("timeout") !== -1) {
          errorMessage = "超时，请检查网络";
        } else {
          errorMessage = "未知错误";
        }
      }

      message.error(errorMessage);
      return Promise.reject(errorMessage);
    }
  )
);

export default axiosInstance;
