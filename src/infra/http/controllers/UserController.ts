import { Request, Response } from 'express';
import { CreateUser } from '../../core/use-case/CreateUser';
import { LoginUser } from '../../core/use-case/LoginUser';
import { PrismaUserRepository } from '../database/PrismaUserRepository';

const userRepository = new PrismaUserRepository();

export class UserController {
    async register(req: Request, res: Response) {
        try {
            const { name, email, password, role } = req.body;
            
            // Apenas ADMIN pode criar outros usuários (exceto o primeiro)
            // Para simplificar, vamos permitir a criação do primeiro usuário
            const userRole = role || 'USER'; 

            const createUser = new CreateUser(userRepository);
            const user = await createUser.execute(name, email, password, userRole);

            return res.status(201).json({ id: user.id, name: user.name, email: user.email, role: user.role });
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const loginUser = new LoginUser(userRepository);
            const { token, role } = await loginUser.execute(email, password);

            return res.json({ token, role });
        } catch (error: any) {
            return res.status(401).json({ error: error.message });
        }
    }
}