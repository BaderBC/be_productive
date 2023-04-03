import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

const {
  DEVELOPMENT_MODE,
  COOKIE_EXPIRATION, //TODO: change this
} = process.env;

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  generateCookie(email): [string, object] {
    const token = this.jwtService.sign({ email });

    const cookieParams = {
      secure: !Boolean(DEVELOPMENT_MODE),
      httpOnly: true,
      expires: COOKIE_EXPIRATION,
    };

    return [token, cookieParams];
  }
}
