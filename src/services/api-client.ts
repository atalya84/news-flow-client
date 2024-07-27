import axios, { CanceledError } from "axios";

export { CanceledError }
const apiClient = axios.create({
    baseURL: process.env.DOMAIN_BASE
});

export default apiClient;