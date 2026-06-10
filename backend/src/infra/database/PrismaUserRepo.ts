import { prisma } from './prisma';
import { IUserRepository } from '../../core/gateways/IUserRepo';
import { User } from '../../core/entities/User';
import { PrismaClient } from 'prisma/generated/main/edge';

export class PrismaUserRepository implements IUserRepository {
    constructor(private prisma: PrismaClient) {}
    async save(user: User): Promise<User> {
        try {
            if (!user?.email || typeof user.email !== 'string') {
                throw new Error('Invalid email provided to save()');
            }
            if (!(prisma as any).user) {
                throw new Error('Prisma client model `user` is not available on the client instance');
            }

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
        } catch (err: any) {
            console.error('PrismaUserRepository.save error:', err?.message || err, { email: user?.email });
            throw err;
        }
    }

    async findByEmail(email: string): Promise<User | null> {
        try {
            const prismaUser = await this.prisma.user.findUnique({ where: { email } });
            return prismaUser;
        } catch (error){
            throw new Error(`Failed to find user with email ${email}: error`);
        }
    }
    

    async findById(id: string): Promise<User | null> {
        try {
            if (!id || typeof id !== 'string') {
                throw new Error('Invalid id provided to findById()');
            }
            if (!(prisma as any).user) {
                throw new Error('Prisma client model `user` is not available on the client instance');
            }
            const prismaUser = await prisma.user.findUnique({ where: { id } });
            return prismaUser ? new User(prismaUser) : null;
        } catch (err: any) {
            console.error('PrismaUserRepository.findById error:', err?.message || err, { id });
            throw err;
        }
    }
}

export default PrismaUserRepository;