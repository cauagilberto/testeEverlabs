export type UserRole = 'ADMIN' | 'USER';

export interface UserProps {
    id?: string;
    name: string;
    email: string;
    password: string;
    role: UserRole;
}

export class User {
    public readonly id?: string;
    public name: string;
    public email: string;
    public password: string;
    public role: UserRole;

    constructor(props: UserProps) {
        Object.assign(this, props);
    }
}