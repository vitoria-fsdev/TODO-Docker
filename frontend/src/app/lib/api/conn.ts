import axios from "axios";

export const connection = axios.create({
    baseURL: 'http://localhost:8000/api',
    timeout: 10000,
});

connection.interceptors.request.use(config => {
   
    return config;
}, error => {
    return Promise.reject(error);
});

connection.interceptors.response.use(response => {
    return response;
}, error => {
    // Handle errors globally
    return Promise.reject(error);
});

export default connection;