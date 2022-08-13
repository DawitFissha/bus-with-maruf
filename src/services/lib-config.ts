import axios from 'axios'
import authHeader from './auth-header';
const axios_instance = axios.create({
    baseURL:"http://localhost:7000/",
    // timeout:5000,
    headers:authHeader(),
    withCredentials:true,
})
export default axios_instance