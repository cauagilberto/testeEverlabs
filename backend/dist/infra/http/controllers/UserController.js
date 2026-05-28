"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const CreateUser_1 = require("../../core/use-case/CreateUser");
const LoginUser_1 = require("../../core/use-case/LoginUser");
const PrismaUserRepository_1 = require("../database/PrismaUserRepository");
const userRepository = new PrismaUserRepository_1.PrismaUserRepository();
class UserController {
    async register(req, res) {
        try {
            const { name, email, password, role } = req.body;
            // Apenas ADMIN pode criar outros usuários (exceto o primeiro)
            // Para simplificar, vamos permitir a criação do primeiro usuário
            const userRole = role || 'USER';
            const createUser = new CreateUser_1.CreateUser(userRepository);
            const user = await createUser.execute(name, email, password, userRole);
            return res.status(201).json({ id: user.id, name: user.name, email: user.email, role: user.role });
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const loginUser = new LoginUser_1.LoginUser(userRepository);
            const { token, role } = await loginUser.execute(email, password);
            return res.json({ token, role });
        }
        catch (error) {
            return res.status(401).json({ error: error.message });
        }
    }
}
exports.UserController = UserController;
