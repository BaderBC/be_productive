import { IsEmail, IsNotEmpty } from 'class-validator';

export class JwtDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
