import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../db/prisma/prisma.service';
import { sha512 } from 'js-sha512';

@Injectable()
export class LoginService {
  constructor(private readonly prisma: PrismaService) {}

  async login(email: string, password: string): Promise<any> {
    const user = await this.prisma.users.findUniqueOrThrow({
      where: { email },
    });
    if (user.password === sha512(password)) {
      delete user.password;
      return user;
    }
    throw new HttpException('Invalid credentials', 401);
  }
}
