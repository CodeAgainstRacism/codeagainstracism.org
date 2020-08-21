import {
  IsNotEmpty,
  IsString,
  IsDate,
  IsOptional,
  MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ProjectDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Code Against Racism' })
  name: string;

  @IsNotEmpty()
  @MaxLength(1000)
  @IsString()
  @ApiProperty({ example: 'A cool project !' })
  description: string;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  @ApiProperty({ example: '2020/06/05' })
  startDate: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  @ApiProperty({ example: '2020/07/16' })
  endDate: Date;

  @IsOptional()
  @MaxLength(300)
  @IsString()
  @ApiProperty({ example: 'https://i.imgur.com/TTFCXdv.png' })
  imageURL: string;

  @ApiProperty({ example: 1 })
  organizationId: number;
}
