import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

const {
  NODE_ENV,
  cookieExpiration, //TODO: change this
  SECRET,
} = process.env;

@Injectable()
export class AuthService {
  generateCookie(email): any[] {
    const token = this.generateJwtToken(email);

    const cookieParams = {
      secure: NODE_ENV !== 'development',
      httpOnly: true,
      expires: cookieExpiration,
    };

    //TODO: change object with token to just token
    return [{ token }, cookieParams];
  }

  generateJwtToken(email): string {
    return jwt.sign({ email }, SECRET);
  }
}
