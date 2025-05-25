import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(email: string, senha: string): Promise<any>;
    login(user: {
        email: string;
        senha: string;
        role?: string;
    }): Promise<{
        access_token: string;
        user: {
            sub: any;
            email: any;
            username: any;
            nome: any;
            role: any;
        };
    }>;
}
