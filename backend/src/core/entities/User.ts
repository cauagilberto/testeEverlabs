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
    public name: string | undefined;
    public email: string | undefined;
    public password: string | undefined;
    public role: UserRole | undefined;

    constructor(props: UserProps) {
        Object.assign(this, props);
    }
}