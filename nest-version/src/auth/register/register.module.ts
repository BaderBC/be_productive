import { Module } from '@nestjs/common';
import { RegisterController } from './register.controller';
import { RegisterService } from './register.service';
import { AuthService } from '../auth.service';

@Module({
  controllers: [RegisterController],
  providers: [RegisterService, AuthService],
})
export class RegisterModule {}
