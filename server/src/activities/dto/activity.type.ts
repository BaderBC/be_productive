import { Field, Int, ObjectType } from '@nestjs/graphql';
import { GraphQLID } from 'graphql/type';
import { GraphQLBigInt } from 'graphql-scalars';

@ObjectType()
export class ActivityType {
  @Field(() => GraphQLID)
  id: number;
  @Field()
  name: string;
  @Field({ nullable: true })
  description: string;
  @Field(() => Int)
  time_to_spend_weekly: number;
  @Field(() => GraphQLBigInt)
  time_spent_ms: number;
  @Field(() => GraphQLBigInt)
  session_start: number;
  @Field()
  is_active: boolean;
}
