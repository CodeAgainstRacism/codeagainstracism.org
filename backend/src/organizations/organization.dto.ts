import {
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  IsString,
  Length,
  MaxLength,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OrganizationDto {
  @Length(10, 10)
  @IsString()
  @ApiProperty({ example: '12-3456789' })
  EIN: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Code Against Racism' })
  name: string;

  @IsNotEmpty()
  @MaxLength(1000)
  @IsString()
  @ApiProperty({
    example:
      'Code Against Racism seeks to use the power of technology to help forward the missions of organizations seeking to end racism.',
  })
  description: string;

  @IsMobilePhone('en-US')
  @ApiProperty({ example: '(718) 222-4041' })
  phoneNumber: string;

  @IsEmail()
  @ApiProperty({ example: 'name@email.com' })
  email: string;

  @IsOptional()
  @Length(8, 128)
  @IsString()
  @ApiProperty({ example: 'unguessable_password' })
  password: string;

  @IsNotEmpty()
  @MaxLength(100)
  @IsString()
  @ApiProperty({ example: 'Jane' })
  contactFirstName: string;

  @IsNotEmpty()
  @MaxLength(100)
  @IsString()
  @ApiProperty({ example: 'Doe' })
  contactLastName: string;
}
