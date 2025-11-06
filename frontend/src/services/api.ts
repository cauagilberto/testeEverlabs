import axios from 'axios';

// Acessa a variável de ambiente definida no docker-compose
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'; 

const api = axios.create({
    baseURL: `${API_URL}/api`,
});

// Interceptor para adicionar o token JWT
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const AuthService = {
    login: (credentials: any) => api.post('/login', credentials),
    register: (data: any) => api.post('/register', data),
};

// Exemplo de Service de Tarefas (a ser implementado)
export const TaskService = {
    getAll: () => api.get('/tasks'),
    // ...
};