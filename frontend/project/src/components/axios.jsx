import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/', // Your Django API URL
});

// The INTERCEPTOR: This runs before every single request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('access');
    if (token) {
        // Must follow the "Bearer <token>" format for SimpleJWT
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;