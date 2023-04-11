import { ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { AuthenticationError } from '@nestjs/apollo';
import { Observable } from 'rxjs';
import { JwtDto } from '../dto/jwt.dto';

@Injectable()
export class GraphqlJwtStrategy extends AuthGuard('jwt') {
  protected readonly logger = new Logger(GraphqlJwtStrategy.name);

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();

    return super.canActivate(new ExecutionContextHost([req]));
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  handleRequest(err: any, user: JwtDto): JwtDto {
    user = user as JwtDto;
    if (err) {
      this.logger.error(`Auth Error! ${err.message}`);
      throw err;
    }
    if (!user) {
      this.logger.error('Auth Error! User not found');
      throw new AuthenticationError('Auth Error! User not found');
    }

    return user;
  }
}
