import axios, { CanceledError } from "axios";
import { config } from "../config/config";

export { CanceledError }
const apiClient = axios.create({
    baseURL: config.DOMAIN_BASE
});

export default apiClient;