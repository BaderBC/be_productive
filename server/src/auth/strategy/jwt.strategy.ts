import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Request } from 'express';
import { JwtDto } from '../dto/jwt.dto';

const { SECRET, NODE_ENV } = process.env;

const extractFromCookie = (req: Request): string | null => {
  if (NODE_ENV === 'development')
    console.log(`\n\nRequest path: "${req.path}"`, req.cookies);

  if (req && req.cookies) return req.cookies['jwt-auth'];
  return null;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: extractFromCookie,
      secretOrKey: SECRET,
      ignoreExpiration: NODE_ENV === 'development',
    });
  }

  validate(payload: JwtDto): JwtDto {
    return payload;
  }
}
