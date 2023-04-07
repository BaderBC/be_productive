import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class PatchActivityDto {
  @IsOptional()
  @IsString()
  name: string;
  @IsOptional()
  @IsString()
  description?: string;
  @IsOptional()
  @IsInt()
  time_to_spend_weekly: number;
  @IsInt()
  @IsNotEmpty()
  activityId: number;
}
