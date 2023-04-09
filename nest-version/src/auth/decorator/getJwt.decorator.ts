import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtDto } from '../dto/jwt.dto';
import { GqlExecutionContext } from '@nestjs/graphql';

export const GetJwt = createParamDecorator(
  (data: unknown, context: ExecutionContext): JwtDto => {
    const isHttp = context.getType() === 'http';
    if (isHttp) {
      const req = context.switchToHttp().getRequest();
      return req.user;
    } else {
      const ctx = GqlExecutionContext.create(context);
      return ctx.getContext().req.user;
    }
  },
);
