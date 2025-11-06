// /backend/src/main/routes.ts

import { Router } from 'express';
import { UserController } from '../infra/http/controllers/UserController';
import { AuthMiddleware, AdminMiddleware } from '../infra/http/middleware/AuthMiddleware';

const router = Router();
const userController = new UserController();

// Rotas Públicas
router.post('/login', userController.login);
router.post('/register', userController.register); // Pode ser protegida por AdminMiddleware após o primeiro usuário

// Rotas Protegidas (Exemplo: Apenas Admin pode criar usuários)
router.post('/users', AuthMiddleware, AdminMiddleware, userController.register);

// Exemplo de Rota Protegida para o próprio usuário
router.get('/me', AuthMiddleware, (req, res) => {
    return res.json({ user: req.user });
});

// Rotas de Tarefas (Implementar em TaskController)
// router.post('/tasks', AuthMiddleware, AdminMiddleware, taskController.create);
// router.put('/tasks/:id/status', AuthMiddleware, taskController.updateStatus);

export default router;