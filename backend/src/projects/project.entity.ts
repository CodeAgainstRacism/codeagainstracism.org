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

  @Column({ default: false })
  @ApiProperty({ example: true })
  isFeatured: boolean;

  @Column()
  @CreateDateColumn()
  @ApiProperty({ example: new Date('2020-07-10T13:08:16.364Z') })
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  @ApiProperty({ example: new Date('2020-07-15T22:50:43.000Z') })
  updatedAt: Date;

  @Column()
  @ApiProperty({ example: 'https://i.imgur.com/TTFCXdv.png' })
  imageURL: string;

  @ManyToOne(
    () => Organization,
    (organization: Organization) => organization.projects,
    { eager: true, onDelete: 'CASCADE' },
  )
  @ApiProperty({
    example: Organization,
  })
  organization: Organization;

  constructor(
    id?: number,
    name?: string,
    description?: string,
    startDate?: Date,
    endDate?: Date,
    imageURL?: string,
    isFeatured?: boolean,
    organization?: Organization,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.startDate = startDate;
    this.endDate = endDate;
    this.imageURL = imageURL;
    this.isFeatured = isFeatured;
    this.organization = organization;
  }
}
