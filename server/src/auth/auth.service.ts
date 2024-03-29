import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtDto } from './dto/jwt.dto';
import { PublicUserInfoDto } from './dto/publicUserInfo.dto';

const {
  NODE_ENV,
  COOKIE_EXPIRATION, //TODO: change this
} = process.env;

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  generateCookie(userId: number, timezone: string): [string, object] {
    const payload: JwtDto = { userId, timezone };
    const token = this.jwtService.sign(payload);

    const cookieParams = {
      secure: NODE_ENV === 'production',
      httpOnly: true,
      expires:
        NODE_ENV === 'production'
          ? new Date(Date.now() + +COOKIE_EXPIRATION)
          : new Date(253402300000000),
    };

    return [token, cookieParams];
  }

  generatePublicUserInfoCookie(
    publicInfo: PublicUserInfoDto,
  ): [string, object] {
    const value = JSON.stringify(publicInfo);

    const cookieParams = {
      httpOnly: false,
      expires:
        NODE_ENV === 'production'
          ? new Date(Date.now() + +COOKIE_EXPIRATION)
          : new Date(253402300000000),
    };

    return [value, cookieParams];
  }
}
