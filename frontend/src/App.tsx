// /frontend/src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard'; // Crie este componente
import ProtectedRoute from './components/ProtectedRoute';

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/unauthorized" element={<div>Acesso Negado</div>} />
                    
                    {/* Rotas Protegidas */}
                    <Route element={<ProtectedRoute />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                    </Route>

                    {/* Rotas Protegidas por Role (Exemplo: Admin) */}
                    <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
                        <Route path="/admin/users" element={<div>Gestão de Usuários (Admin)</div>} />
                    </Route>

                    {/* Redirecionamento inicial */}
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                </Routes>
            </Router>
        </Provider>
    );
};

export default App;