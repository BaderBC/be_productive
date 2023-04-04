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
    const { id: userId } = await this.loginService.login(
      dto.email,
      dto.password,
    );
    const [token, cookieParams] = this.authService.generateCookie(userId);
    res
      .status(200)
      .cookie('jwt-auth', token, cookieParams)
      .send({ message: 'Logged in' });
  }
}
