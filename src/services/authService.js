import axios from "axios";

const API_URL = 'http://localhost:5000/api/auth';

const api = axios.create ({
    baseURL: API_URL,
    withcCredentials: true
});

export const authService = {
    register: async (name, email, password) => {
        const response = await api.post('/register', { name, email, password });
        return response.data;
    },

    login: async (email, password) => {
        const response = await api.post('/login', { email, password });
        return response.data;
    },

    logout: async () => {
        const response = await api.post('/logout');
        return response.data;
    },

    getMe: async () => {
        const response = await api.get('/me');
        return response.data;
    }
};

export default authService;