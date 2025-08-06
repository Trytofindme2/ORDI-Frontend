import axios from "axios";

const adminAPI = axios.create({
    baseURL: import.meta.env.VITE_ADMIN_URL,
    withCredentials: true,
})

export default adminAPI;