import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register.dto';
import { DbService } from '../../db/db.service';
import { sha512 } from 'js-sha512';

@Injectable()
export class RegisterService {
  constructor(private readonly prisma: DbService) {}

  async addNewUser(userDto: RegisterUserDto) {
    userDto.password = sha512(userDto.password);
    console.log(userDto);
    await this.prisma.users.create({ data: userDto });
  }
}
