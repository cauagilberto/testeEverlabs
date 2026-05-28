"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminMiddleware = exports.AuthMiddleware = void 0;
const JwtServices_1 = require("../security/JwtServices");
const AuthMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Token not provided.' });
    }
    const token = authHeader.split(' ')[1];
    const payload = JwtServices_1.JwtService.verifyToken(token);
    if (!payload) {
        return res.status(401).json({ error: 'Invalid token.' });
    }
    req.user = payload;
    next();
};
exports.AuthMiddleware = AuthMiddleware;
const AdminMiddleware = (req, res, next) => {
    if (!req.user || req.user.role !== 'ADMIN') {
        return res.status(403).json({ error: 'Access denied. Admin required.' });
    }
    next();
};
exports.AdminMiddleware = AdminMiddleware;
