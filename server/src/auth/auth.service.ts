import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtDto } from "./dto/jwt.dto";

const {
  DEVELOPMENT_MODE,
  COOKIE_EXPIRATION, //TODO: change this
} = process.env;

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  generateCookie(userId: number): [string, object] {
    const payload: JwtDto = { userId };
    const token = this.jwtService.sign(payload);

    const cookieParams = {
      secure: !Boolean(DEVELOPMENT_MODE),
      httpOnly: true,
      expires: COOKIE_EXPIRATION,
    };

    return [token, cookieParams];
  }
}
