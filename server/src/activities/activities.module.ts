import { Module } from '@nestjs/common';
import { ActivitiesController } from './activities.controller';
import { ActivitiesService } from './activities.service';
import { ActivitiesResolver } from './activities.resolver';

@Module({
  controllers: [ActivitiesController],
  providers: [ActivitiesService, ActivitiesResolver],
})
export class ActivitiesModule {}
