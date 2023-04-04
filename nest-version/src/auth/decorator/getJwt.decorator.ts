import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtDto } from '../dto/jwt.dto';

export const GetJwt = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): JwtDto => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
