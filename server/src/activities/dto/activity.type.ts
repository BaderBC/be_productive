import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ActivityType {
  @Field()
  id: number;
  @Field()
  name: string;
  @Field()
  description: string;
  @Field()
  time_to_spend_weekly: number;
  @Field()
  user_id: number;
  @Field()
  time_spent_ms: number;
  @Field()
  session_start: number;
  @Field()
  is_active: boolean;
}
