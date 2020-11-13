import { IsEmail, IsString, MaxLength, IsMobilePhone, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @IsString()
  @ApiProperty({ example: 'Jane' })
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Doe' })
  lastName: string;

  @IsMobilePhone('en-US')
  @ApiProperty({ example: '(718) 222-4041' })
  phoneNumber: string;

  @IsEmail()
  @ApiProperty({ example: 'example@email.com' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'unguessable_password' })
  password: string;

  @MaxLength(1000)
  @IsString()
  @ApiProperty({
    example:
      '"John Doe" (for males) and "Jane Doe" (for females) are multiple-use names that are used when the true name of a person is unknown or is being intentionally concealed.',
  })
  description: string;
}
