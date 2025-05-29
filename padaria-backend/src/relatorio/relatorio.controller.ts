import { Controller, Get, UseGuards, Request, BadRequestException } from '@nestjs/common';
import { RelatorioService } from './relatorio.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import * as jwt from 'jsonwebtoken';

@Controller('relatorio')
export class RelatorioController {
  constructor(private readonly relatorioService: RelatorioService) {}

private extrairUserId(req: Request): string {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];

    if (!token) {
      throw new BadRequestException('Token de autenticação ausente');
    }

    try {
      const decoded = jwt.decode(token) as { sub: string };
      const userId = decoded?.sub;
      if (!userId) throw new Error();
      return userId;
    } catch {
      throw new BadRequestException('Token inválido');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('resumo')
  async getResumo(@Request() req: any) {
    const userId = this.extrairUserId(req);
    return this.relatorioService.getResumo(userId);
  }
}
