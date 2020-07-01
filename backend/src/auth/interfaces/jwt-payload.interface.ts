import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class JwtPayload {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
