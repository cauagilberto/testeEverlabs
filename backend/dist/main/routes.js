"use strict";
// /backend/src/main/routes.ts
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../infra/http/controllers/UserController");
const AuthMiddleware_1 = require("../infra/http/middleware/AuthMiddleware");
const router = (0, express_1.Router)();
const userController = new UserController_1.UserController();
// Rotas Públicas
router.post('/login', userController.login);
router.post('/register', userController.register); // Pode ser protegida por AdminMiddleware após o primeiro usuário
// Rotas Protegidas (Exemplo: Apenas Admin pode criar usuários)
router.post('/users', AuthMiddleware_1.AuthMiddleware, AuthMiddleware_1.AdminMiddleware, userController.register);
// Exemplo de Rota Protegida para o próprio usuário
router.get('/me', AuthMiddleware_1.AuthMiddleware, (req, res) => {
    return res.json({ user: req.user });
});
// Rotas de Tarefas (Implementar em TaskController)
// router.post('/tasks', AuthMiddleware, AdminMiddleware, taskController.create);
// router.put('/tasks/:id/status', AuthMiddleware, taskController.updateStatus);
exports.default = router;
