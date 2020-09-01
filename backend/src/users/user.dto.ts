import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @IsString()
  @ApiProperty({ example: 'Jane' })
  firstName: string;

  @IsString()
  @ApiProperty({ example: 'Doe' })
  lastName: string;

  @IsEmail()
  @ApiProperty({ example: 'name@email.com' })
  email: string;

  @ApiProperty({ example: 'unguessable_password' })
  password: string;
}
