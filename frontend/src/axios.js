import axios from 'axios';

const instance = axios.create({
    baseURL: "http://localhost:8080",
    // baseURL: "http://localhost:5000",
    withCredentials: true
});

export default instance;