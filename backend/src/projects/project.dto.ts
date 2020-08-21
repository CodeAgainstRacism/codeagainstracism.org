import {
  IsNotEmpty,
  IsString,
  IsDate,
  IsOptional,
  MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Url } from 'url';

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
  @IsDate()
  @Type(() => Date)
  @ApiProperty({ example: '2020/07/16' })
  imageURL: Url;

  @ApiProperty({ example: 1 })
  organizationId: number;
}
