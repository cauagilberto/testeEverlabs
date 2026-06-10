import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApiService } from '../services/api';


const Register: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            await ApiService.validateEmail(email);
        }catch (err: any) {
            return setError(err.response?.data?.error || 'Email já está em uso.');
         }

        try {
            await ApiService.register({ name, email, password });
            setSuccess('Usuário criado com sucesso. Você pode fazer login agora.');
            setTimeout(() => navigate('/login'), 1500);
        } catch (err: any) {
            setError(err.response?.data?.error || 'Falha ao criar usuário.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Registrar</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <input
                type="text"
                placeholder="Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit" onClick={Register}>Cadastrar</button>
        </form>
    );
};

export default Register;
