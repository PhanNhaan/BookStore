import axios from 'axios';

const instance = axios.create({
    baseURL: "http://localhost:8080",
    // baseURL: "http://localhost:5000",
    withCredentials: true
});

instance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('authToken')}`;

// Alternatively, set other headers you may need for all requests
// instance.defaults.headers.common['Content-Type'] = 'application/json';

export default instance;