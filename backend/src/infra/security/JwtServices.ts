import jwt from 'jsonwebtoken';
import { User } from '../../core/entities/User';

const SECRET = process.env.JWT_SECRET || 'default_secret';

export class JwtService {
    static generateToken(user: User): string {
        return jwt.sign(
            { userId: user.id, role: user.role },
            SECRET,
            { expiresIn: '7d' }
        );
    }

    static verifyToken(token: string): { userId: string, role: string } | null {
        try {
            return jwt.verify(token, SECRET) as { userId: string, role: string };
        } catch (error) {
            return null;
        }
    }
}