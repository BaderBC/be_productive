import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterModule } from './register/register.module';
import { LoginModule } from './login/login.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { GraphqlJwtStrategy } from './strategy/graphQl.jwt.strategy';

const { SECRET: secret, JWT_EXPIRATION: expiresIn = '1d' } = process.env;

@Module({
  imports: [
    forwardRef(() => RegisterModule),
    forwardRef(() => LoginModule),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret,
      signOptions: { expiresIn },
    }),
  ],
  providers: [AuthService, JwtStrategy, GraphqlJwtStrategy],
  exports: [AuthService, PassportModule, JwtStrategy, GraphqlJwtStrategy],
})
export class AuthModule {}
