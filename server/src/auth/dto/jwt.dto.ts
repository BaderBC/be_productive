import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { IsTimezone } from '../../utils/is-timezone.validator';

export class JwtDto {
  @IsInt()
  @IsNotEmpty()
  userId: number;
  @IsString()
  @IsTimezone()
  @IsNotEmpty()
  timezone: string;
}
