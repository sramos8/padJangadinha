import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(credentials: {
        email: string;
        senha: string;
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
