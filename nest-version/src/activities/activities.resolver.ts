import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class ActivitiesResolver {
  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }
}
