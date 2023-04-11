import { forwardRef, Module } from '@nestjs/common';
import { RegisterController } from './register.controller';
import { RegisterService } from './register.service';
import { AuthModule } from '../auth.module';

@Module({
  imports: [forwardRef(() => AuthModule)],
  controllers: [RegisterController],
  providers: [RegisterService],
})
export class RegisterModule {}
