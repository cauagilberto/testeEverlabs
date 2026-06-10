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
    getCurrentUser: () => api.get('/me'),
};

// Exemplo de Service de Tarefas (a ser implementado)
export const TaskService = {
    getAll: () => api.get('/tasks'),
    // ...
};

export const ApiService = {
    register: (user: {name: string, email: string, password: string}) =>
        fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        }).then(res => res.json()).catch(err => Promise.reject(err)),

    validateEmail: (email: string) =>
        fetch(`/api/validate-email/${email}`,
            {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            })
        .then(res => {
            if (!res.ok) {
                throw new Error('Email já está em uso.');
            }
            return res.json();
        }).catch(err => Promise.reject(err))
}

export default ApiService;