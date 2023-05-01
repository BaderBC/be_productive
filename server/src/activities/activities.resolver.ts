import { Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GraphqlJwtStrategy } from '../auth/strategy/graphQl.jwt.strategy';
import { GetJwt } from '../auth/decorator/getJwt.decorator';
import { JwtDto } from '../auth/dto/jwt.dto';
import { ActivitiesService } from './activities.service';
import { ActivityType } from './dto/activity.type';

@UseGuards(GraphqlJwtStrategy)
@Resolver()
export class ActivitiesResolver {
  constructor(private activitiesService: ActivitiesService) {}

  @Query(() => [ActivityType])
  allActivities(@GetJwt() jwt: JwtDto): Promise<ActivityType[]> {
    return this.activitiesService.getAllActivities(jwt.userId, jwt.timezone);
  }

  @Query(() => [ActivityType])
  unfinishedActivities(@GetJwt() jwt: JwtDto): Promise<ActivityType[]> {
    return this.activitiesService.getUnfinishedActivities(
      jwt.userId,
      jwt.timezone,
    );
  }
}
