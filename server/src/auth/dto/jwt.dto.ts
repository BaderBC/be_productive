import { IsInt, IsNotEmpty } from 'class-validator';

export class JwtDto {
  @IsInt()
  @IsNotEmpty()
  userId: number;
}
