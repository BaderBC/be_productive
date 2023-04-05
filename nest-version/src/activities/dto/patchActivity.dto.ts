import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class PatchActivityDto {
  @IsString()
  name: string;
  @IsString()
  description?: string;
  @IsInt()
  time_to_spend_weekly: number;
  @IsInt()
  @IsNotEmpty()
  activityId: number;
}
