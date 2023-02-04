import { Body, Controller, Post, Redirect, Res } from '@nestjs/common';
import { Response } from 'express';
import { RegisterUserDto } from './register.dto';
import { RegisterService } from './register.service';
import { AuthService } from '../auth.service';

@Controller('auth/register')
export class RegisterController {
  constructor(
    private readonly registerService: RegisterService,
    private readonly authService: AuthService,
  ) {}
  @Post()
  @Redirect('/')
  //
  //TODO: Complete code bellow
  //
  async register(@Body() body: RegisterUserDto, @Res() res: Response) {
    console.log(body);
    await this.registerService.addNewUser(body);
    const cookie: any[] = this.authService.generateCookie(body.email);
    res.status(200).cookie('jwt-auth', cookie);
  }
}
