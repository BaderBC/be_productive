import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { AuthService } from '../auth.service';

@Module({
  controllers: [LoginController],
  providers: [LoginService, AuthService],
})
export class LoginModule {}
