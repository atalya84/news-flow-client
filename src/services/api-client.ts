import axios from "axios";
import {config} from '../config/config.js'

const apiClient = axios.create({
    baseURL: config.BASE_DOMAIN
});

export default apiClient;