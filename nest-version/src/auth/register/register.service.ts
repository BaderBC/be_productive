import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register.dto';
import { PrismaService } from '../../db/prisma/prisma.service';
import { sha512 } from 'js-sha512';

@Injectable()
export class RegisterService {
  constructor(private readonly prisma: PrismaService) {}

  async addNewUser(userDto: RegisterUserDto): Promise<any> {
    userDto.password = sha512(userDto.password);
    console.log(userDto);
    return await this.prisma.users.create({ data: userDto });
  }
}
