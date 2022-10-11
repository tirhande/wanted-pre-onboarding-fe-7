import axios from "axios";

const token = localStorage.getItem("accessToken");

export const request = axios.create({
  baseURL: "https://pre-onboarding-selection-task.shop/",
  headers: {
    Authorization: `Bearer ${token}`,
  }
});

export const setRequestHeaders = (token) => {
  request.interceptors.request.use(function (config) {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
};
