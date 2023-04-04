import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class AddActivityDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  description?: string;
  @IsInt()
  @IsNotEmpty()
  time_to_spend_weekly: number;
}
