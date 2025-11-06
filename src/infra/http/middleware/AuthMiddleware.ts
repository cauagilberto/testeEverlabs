import { Request, Response, NextFunction } from 'express';
import { JwtService } from '../security/JwtServices';

// Extende a interface Request do Express para adicionar o campo 'user'
declare global {
    namespace Express {
        interface Request {
            user?: { userId: string, role: string };
        }
    }
}

export const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Token not provided.' });
    }

    const token = authHeader.split(' ')[1];
    const payload = JwtService.verifyToken(token);

    if (!payload) {
        return res.status(401).json({ error: 'Invalid token.' });
    }
    
    req.user = payload; 
    next();
};

export const AdminMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || req.user.role !== 'ADMIN') {
        return res.status(403).json({ error: 'Access denied. Admin required.' });
    }
    next();
};