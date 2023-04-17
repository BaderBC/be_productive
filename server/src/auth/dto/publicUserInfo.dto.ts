import { IsEmail, IsInt, IsNotEmpty } from 'class-validator';

export class PublicUserInfoDto {
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}
