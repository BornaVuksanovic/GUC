import axios from "axios";


const BASE_URL = __DEV__ ? "http://172.20.10.11:5000" : "https://guc.onrender.com" ;

const api = axios.create({
    baseURL: BASE_URL
});

export default api;