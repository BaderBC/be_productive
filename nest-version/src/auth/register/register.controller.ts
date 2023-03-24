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
    await this.registerService.addNewUser(body);
    const cookie = this.authService.generateCookie(body.email);
    // TODO: do the same as in login.controller.ts (destruct cookie)
    res.status(200).cookie('jwt', ...cookie);
    res.send({ message: 'User created' });
  }
}
