import axios from "axios";
import {config} from '../config/config.js'

const apiClient = axios.create({
    baseURL: config.BASE_DOMAIN
});

apiClient.interceptors.request.use(
    config => {
        config.headers['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}` || "";
        config.headers['refresh_token'] = localStorage.getItem('refreshToken') || "";
        if (!config.headers['Content-Type'])
            config.headers['Content-Type'] = 'application/json';
        return config
    },
    error => {
        return Promise.reject(error);
    },
)

apiClient.interceptors.response.use(
    res => res,
    async error => {
        console.log("got here mother fucker")
        console.log("error", error.response)
        if (error.response.status === 401 && error.config.url !== '/auth/refresh') {
            apiClient.get('/auth/refresh').then( function(res){
            console.log(res);
            localStorage.setItem('refreshToken', res.data.refreshToken);
            localStorage.setItem('accessToken', res.data.accessToken);
            }
            )

            return await apiClient(error.config)  // retry failed request
        } 
        if (error.response.status === 401 && error.config.url === '/auth/refresh') {
            console.log("for the sport")
            // if refresh returned 401, logout and return to home page
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('accessToken');
            window.location.href = '/'
        }
        return Promise.reject(error);
    },
)

export default apiClient;