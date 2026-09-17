import axios from "axios";

export const api = axios.create({
    baseURL:
        import.meta.env.VITE_API_URL ||
        "https://smartkhata-ve7h.onrender.com/api",
    withCredentials: true,
});