import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, senha: string) {
  const users = await this.usersService.findAll();
  const user = users.find(u => u.email === email && u.senha === senha);

if (!user) {
  throw new UnauthorizedException('Credenciais inválidas');
}

    return user;
  }

  async login(user: { email: string; senha: string, role?: string }) {
    const validUser = await this.validateUser(user.email, user.senha);
    const payload = {
      sub: validUser.id,
      email: validUser.email,
      username: validUser.username,
      nome: validUser.nome,
      role: validUser.role, // Define 'user' como padrão se não vier do front
    };
    return {
      access_token: this.jwtService.sign(payload),
      user: payload,
    };
  }
}
