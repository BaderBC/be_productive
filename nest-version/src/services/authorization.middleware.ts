import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { Injectable, NestMiddleware } from '@nestjs/common';

const { SECRET = 'c23487908n3410nx3as1dx' } = process.env;

@Injectable()
export class AuthorizationMiddleware implements NestMiddleware {
  use(req: Request & { token: string }, res: Response, next: NextFunction) {
    try {
      console.log('\n\n cookies', req.cookies, '\n');
      const { token } = req.cookies['jwt-auth'][0];
      console.log('token: ', token);
      req.token = jwt.verify(token, SECRET);

      next();
    } catch (err) {
      console.error(err);
      return res.status(401).json({
        ok: false,
        redirect: '/auth',
        message: 'ERROR: you need to be logged in',
      });
    }
  }
}
