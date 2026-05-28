"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET = process.env.JWT_SECRET || 'default_secret';
class JwtService {
    static generateToken(user) {
        return jsonwebtoken_1.default.sign({ userId: user.id, role: user.role }, SECRET, { expiresIn: '7d' });
    }
    static verifyToken(token) {
        try {
            return jsonwebtoken_1.default.verify(token, SECRET);
        }
        catch (error) {
            return null;
        }
    }
}
exports.JwtService = JwtService;
