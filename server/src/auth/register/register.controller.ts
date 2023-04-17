import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { RegisterUserDto } from './dto/register.dto';
import { RegisterService } from './register.service';
import { AuthService } from '../auth.service';

@Controller('auth/register')
export class RegisterController {
  constructor(
    private readonly registerService: RegisterService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  async register(@Body() body: RegisterUserDto, @Res() res: Response) {
    const { id: userId, email } = await this.registerService.addNewUser(body);
    const [token, cookieParams] = this.authService.generateCookie(userId);
    res
      .status(200)
      .cookie('jwt-auth', token, cookieParams)
      .cookie(
        'user-public-info',
        ...this.authService.generatePublicUserInfoCookie({ userId, email }),
      )
      .send({ message: 'User created' });
  }
}
