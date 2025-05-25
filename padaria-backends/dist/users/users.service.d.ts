export declare class UsersService {
    findAll(): Promise<any[]>;
    create(user: {
        nome: string;
        email: string;
        senha: string;
        username: string;
        role?: string;
    }): Promise<any>;
    update(id: string, user: Partial<{
        nome: string;
        email: string;
        senha: string;
        username: string;
        role: string;
    }>): Promise<any>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
