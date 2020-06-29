import { IsEmail, IsMobilePhone, IsNotEmpty, IsString, Length, MaxLength, IsOptional } from 'class-validator';

export class OrganizationDto {
  @Length(10, 10)
  @IsString()
  EIN: string;
  
  @IsNotEmpty()
  @IsString()
  name: string;
  
  @IsNotEmpty()
  @MaxLength(1000)
  @IsString()
  description: string;

  @IsMobilePhone('en-US')
  phoneNumber: string;
  
  @IsEmail()
  email: string;
  
  @IsOptional()
  @Length(8, 128)
  @IsString()
  password: string;
  
  @IsNotEmpty()
  @MaxLength(100)
  @IsString()
  contactFirstName: string;
  
  @IsNotEmpty()
  @MaxLength(100)
  @IsString()
  contactLastName: string;
}
