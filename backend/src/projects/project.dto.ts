import {
  IsNotEmpty,
  IsString,
  IsDate,
  MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';

export class ProjectDto {
  
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @MaxLength(1000)
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  endDate: Date;
}
