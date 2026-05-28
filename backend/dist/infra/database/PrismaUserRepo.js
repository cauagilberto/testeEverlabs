"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaUserRepository = void 0;
const client_1 = require("@prisma/client");
const User_1 = require("../../core/entities/User");
const prisma = new client_1.PrismaClient();
class PrismaUserRepository {
    async save(user) {
        const prismaUser = await prisma.user.upsert({
            where: { email: user.email },
            update: { name: user.name, password: user.password, role: user.role },
            create: {
                name: user.name,
                email: user.email,
                password: user.password,
                role: user.role,
            },
        });
        return new User_1.User(prismaUser);
    }
    async findByEmail(email) {
        const prismaUser = await prisma.user.findUnique({ where: { email } });
        return prismaUser ? new User_1.User(prismaUser) : null;
    }
    async findById(id) {
        const prismaUser = await prisma.user.findUnique({ where: { id } });
        return prismaUser ? new User_1.User(prismaUser) : null;
    }
}
exports.PrismaUserRepository = PrismaUserRepository;
