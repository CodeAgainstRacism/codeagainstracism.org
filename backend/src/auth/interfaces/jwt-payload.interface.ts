import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class JwtPayload {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'email@email.com' })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'password' })
  readonly password: string;
}
