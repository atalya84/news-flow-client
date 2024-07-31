import axios from "axios";
import { config } from "../config/config.js";

const apiClient = axios.create({
    baseURL: config.DOMAIN_BASE
});

apiClient.interceptors.request.use(
    config => {
        const accessToken = localStorage.getItem('accessToken') || "";
        const refreshToken = localStorage.getItem('refreshToken') || "";

        config.headers['Authorization'] = `Bearer ${accessToken}`;
        config.headers['refresh_token'] = refreshToken;

        // Ensure Content-Type is only set if not sending FormData
        if (!(config.data instanceof FormData) && !config.headers['Content-Type']) {
            config.headers['Content-Type'] = 'application/json';
        }

        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    res => res,
    async error => {
        if (error.response.status === 401 && error.config.url !== '/auth/refresh') {
            const res = await apiClient.get('/auth/refresh');
            console.log("REFRESH WORKED!!!");
            localStorage.setItem('refreshToken', res.data.refreshToken);
            localStorage.setItem('accessToken', res.data.accessToken);
            return await apiClient(error.config); // retry failed request
        } else if (error.response.status === 401 && error.config.url === '/auth/refresh') {
            // if refresh returned 401, logout and return to home page
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('accessToken');
            window.location.href = '/';
        }

        return Promise.reject(error);
    }
);

export default apiClient;
