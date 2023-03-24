import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterModule } from './register/register.module';
import { LoginModule } from './login/login.module';

@Module({
  providers: [AuthService],
  imports: [RegisterModule, LoginModule],
})
export class AuthModule {}
