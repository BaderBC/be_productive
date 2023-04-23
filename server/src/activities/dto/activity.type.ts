import { Field, Int, ObjectType } from '@nestjs/graphql';
import { GraphQLID } from 'graphql/type';
import { GraphQLDate } from 'graphql-scalars';

@ObjectType()
export class ActivityType {
  @Field(() => GraphQLID)
  id: number;
  @Field()
  name: string;
  @Field({ nullable: true })
  description: string | null;
  @Field(() => Int)
  time_to_spend_weekly: number;
  @Field(() => Int)
  time_spent_ms: number;
  @Field(() => GraphQLDate, { nullable: true })
  session_start: Date | null;
  @Field()
  is_active: boolean;
}
