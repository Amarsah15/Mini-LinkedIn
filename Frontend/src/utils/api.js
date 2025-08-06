import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://mini-linkedin-2lxq.onrender.com/api/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
