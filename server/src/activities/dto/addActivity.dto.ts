import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AddActivityDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsOptional()
  description?: string;
  @IsInt()
  @IsNotEmpty()
  time_to_spend_weekly: number;
}
