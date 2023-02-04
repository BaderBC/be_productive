import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { AppController } from './app.controller';
import { ActivitiesModule } from './activities/activities.module';
import { AuthModule } from './auth/auth.module';

import { AuthorizationMiddleware } from './services/authorization.middleware';
import { ActivitiesController } from './activities/activities.controller';
import { DbModule } from './db/db.module';

@Module({
  imports: [ActivitiesModule, AuthModule, DbModule],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthorizationMiddleware).forRoutes(ActivitiesController);
  }
}
