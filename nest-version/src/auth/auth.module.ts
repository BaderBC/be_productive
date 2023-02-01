import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RegisterModule } from './register/register.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [RegisterModule],
})
export class AuthModule {}
