import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IsTimezone } from '../../../utils/is-timezone.validator';

export class RegisterUserDto {
  @IsOptional()
  firstName: string;
  @IsOptional()
  lastName: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  @IsString()
  @IsTimezone()
  timezone: string;
}
