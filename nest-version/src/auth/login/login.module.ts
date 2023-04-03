import { forwardRef, Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { AuthModule } from '../auth.module';

@Module({
  imports: [forwardRef(() => AuthModule)],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}
