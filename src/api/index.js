import axiosInstance from "./requerst";

export const reqLogin = (username, password) =>
  axiosInstance({
    method: "POST",
    url: "/login",
    data: {
      username,
      password
    }
  });
