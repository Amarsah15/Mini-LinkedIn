import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://connectify-wjv8.onrender.com/api/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
