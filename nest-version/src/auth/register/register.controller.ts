import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUserDto } from './register.dto';
import { RegisterService } from './register.service';

@Controller('auth/register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}
  @Post()
  async register(@Body() body: RegisterUserDto): Promise<string> {
    console.log(body);
    await this.registerService.addNewUser(body);
    return 'To be continued';
  }
}
