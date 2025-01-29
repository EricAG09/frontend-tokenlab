// src/services/authService.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/auth/';


const api = axios.create({
    baseURL: API_URL,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const loginUser  = async (email, password) => {
    const response = await axios.post(`${API_URL}login`, { email, password });
    return response.data;
};

export const registerUser  = async (userData) => {
    const response = await axios.post(`${API_URL}register`, userData);
    return response.data;
};

// Adicione outras funções de serviço conforme necessário