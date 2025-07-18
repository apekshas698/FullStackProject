import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // ✅ Reads from .env
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
