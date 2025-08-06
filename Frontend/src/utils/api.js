import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:
    "http://localhost:8000/api/v1" ||
    "https://mini-linkedin-j86g.onrender.com/api/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
