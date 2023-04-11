import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

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
}
