import { User, UserRole } from '../entities/User';
import { IUserRepository } from '../gateways/IUserRepo';
import * as bcrypt from 'bcryptjs';

export class CreateUser {
    constructor(private userRepository: IUserRepository) {}

    async execute(name: string, email: string, password: string, role: UserRole): Promise<User> {
        if (!name || !email || !password) {
            throw new Error('Missing required fields.');
        }
        
        const existingUser = await this.userRepository.findByEmail(email);
        if (existingUser) {
            throw new Error('User already exists.');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ name, email, password: hashedPassword, role });
        
        return this.userRepository.save(user);
    }
}