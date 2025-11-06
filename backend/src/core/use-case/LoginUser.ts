import { IUserRepository } from '../gateways/IUserRepo';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '../../infra/security/JwtServices';

export class LoginUser {
    constructor(private userRepository: IUserRepository) {}

    async execute(email: string, password: string): Promise<{ token: string, role: string }> {
        const user = await this.userRepository.findByEmail(email);

        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new Error('Invalid credentials.');
        }

        const token = JwtService.generateToken(user);

        return { token, role: user.role };
    }
}