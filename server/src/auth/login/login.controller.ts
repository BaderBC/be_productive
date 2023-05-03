import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { LoginService } from './login.service';
import { LoginDto } from './dto/login.dto';
import { AuthService } from '../auth.service';

@Controller('auth/login')
export class LoginController {
  constructor(
    private readonly loginService: LoginService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  async login(@Body() dto: LoginDto, @Res() res: Response) {
    const {
      id: userId,
      email,
      timezone,
    } = await this.loginService.login(dto.email, dto.password);

    const [token, cookieParams] = this.authService.generateCookie(
      userId,
      timezone,
    );

    res
      .status(200)
      .cookie('jwt-auth', token, cookieParams)
      .cookie(
        'user-public-info',
        ...this.authService.generatePublicUserInfoCookie({ userId, email }),
      )
      .send({ message: 'Logged in' });
  }
}
