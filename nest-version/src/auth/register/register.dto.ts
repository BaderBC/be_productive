import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterUserDto {
  firstName: string;
  lastName: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  password: string;
}
