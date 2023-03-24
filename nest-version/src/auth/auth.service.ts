import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

const {
  NODE_ENV,
  cookieExpiration, //TODO: change this
  SECRET = 'c23487908n3410nx3as1dx',
} = process.env;

@Injectable()
export class AuthService {
  generateCookie(email): [string, object] {
    const token = this.generateJwtToken(email);

    const cookieParams = {
      secure: NODE_ENV !== 'development',
      httpOnly: true,
      expires: cookieExpiration,
    };

    return [token, cookieParams];
  }

  generateJwtToken(email): string {
    return jwt.sign({ email }, SECRET);
  }
}
