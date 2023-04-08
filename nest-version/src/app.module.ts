import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { DbModule } from './db/db.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ActivitiesModule } from './activities/activities.module';

@Module({
  imports: [
    AuthModule,
    DbModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    ActivitiesModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
