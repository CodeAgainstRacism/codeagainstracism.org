import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Organization } from '../organizations/organization.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 6 })
  id: number;

  @Column()
  @ApiProperty({ example: 'Code Against Racism' })
  name: string;

  @Column({ length: '1023' })
  @ApiProperty({ example: 'A cool project !' })
  description: string;

  @Column()
  @ApiProperty({ example: new Date('2020/06/23') })
  startDate: Date;

  @Column({ default: null })
  @ApiProperty({ example: new Date('2038/01/19') })
  endDate: Date;

  @Column()
  @CreateDateColumn()
  @ApiProperty({ example: new Date('2020-07-10T13:08:16.364Z') })
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  @ApiProperty({ example: new Date('2020-07-15T22:50:43.000Z') })
  updatedAt: Date;

  @ManyToOne(() => Organization, { eager: true })
  @ApiProperty({
    example: new Organization(
      1,
      '12-3456789',
      'Hack Your Own',
      'Due to COVID-19, tens of thousands of Computer Science internships have been canceled, leaving students stranded.',
      '(123) 456-7890',
      'email@email.com',
      'John',
      'Doe',
    ),
  })
  organization: Organization;

  constructor(
    id?: number,
    name?: string,
    description?: string,
    startDate?: Date,
    endDate?: Date,
    organization?: Organization,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.startDate = startDate;
    this.endDate = endDate;
    this.organization = organization;
  }
}
