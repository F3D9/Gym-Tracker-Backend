import { Controller, Post, HttpCode, HttpStatus, Body, Get, UseGuards, Request, Res } from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { UserDto } from 'src/dtos/user.dto';
import { AuthGuard } from './auth.guards';

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true,
  sameSite: 'none' as const,
  maxAge: 2 * 24 * 60 * 60 * 1000, // 2 días
};

const GUEST_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true,
  sameSite: 'none' as const,
  maxAge: 2 * 60 * 60 * 1000, // 2 horas
};

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(
    @Body() data: UserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.register(data);
    res.cookie('jwt', result.accessToken, COOKIE_OPTIONS);
    return result;
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body() input: { email: string; password: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.login(input);
    res.cookie('jwt', result.accessToken, COOKIE_OPTIONS);
    return result;
  }

  @UseGuards(AuthGuard)
  @Get('me')
  getMe(@Res({ passthrough: true }) res: Response) {
    return res.locals.user;
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Res({ passthrough: true }) res: Response) {
    return this.authService.logout(res);
  }

  @Post('guest')
  async loginAsGuest() {
    return this.authService.createGuest();
  }
}