import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guard/jwt.guard';
import { Request } from 'express';

interface RegisterDto {
  email: string;
  password: string;
}

interface LoginDto {
  email: string;
  password: string;
}

interface JwtRequest extends Request {
  user?: {
    userId: string;
    email: string;
  };
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: RegisterDto): Promise<{ message: string }> {
    return await this.authService.register(body.email, body.password);
  }

  @Post('login')
  async login(@Body() body: LoginDto): Promise<{ access_token: string }> {
    return await this.authService.login(body.email, body.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(
    @Req() req: JwtRequest,
  ): { userId: string; email: string } | undefined {
    return req.user;
  }
}
