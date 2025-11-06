import { PrismaClient } from '@prisma/client';
import { IUserRepository } from '../../core/gateways/IUserRepo';
import { User } from '../../core/entities/User';

const prisma = new PrismaClient();

export class PrismaUserRepository implements IUserRepository {
    async save(user: User): Promise<User> {
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
        return new User(prismaUser);
    }

    async findByEmail(email: string): Promise<User | null> {
        const prismaUser = await prisma.user.findUnique({ where: { email } });
        return prismaUser ? new User(prismaUser) : null;
    }

    async findById(id: string): Promise<User | null> {
        const prismaUser = await prisma.user.findUnique({ where: { id } });
        return prismaUser ? new User(prismaUser) : null;
    }
}