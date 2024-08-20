import axios from "axios";

const api = {
    login: (credentials) => axios.post('http://localhost:8000/api/auth/token/', credentials),
    refreshAccessToken: (credentials) => axios.post('http://localhost:8000/api/auth/token/refresh/', credentials),
    signup: (credentials) => axios.post('http://localhost:8000/api/auth/signup/', credentials),
};

export default api;
