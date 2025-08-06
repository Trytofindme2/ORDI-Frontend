import axios from "axios";
const userAPI = axios.create({
    baseURL: import.meta.env.VITE_USER_URL,
    withCredentials: true,
})

export default userAPI