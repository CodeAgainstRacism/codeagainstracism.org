import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Organization } from '../organizations/organization.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ length: '1023' })
  description: string;

  @Column()
  startDate: Date;

  @Column({ default: null })
  endDate: Date;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(
    () => Organization,
    author => author.name,
  )
  organization: Organization;

  constructor(
    id?: number,
    name?: string,
    description?: string,
    startDate?: Date,
    endDate?: Date,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.startDate = startDate;
    this.endDate = endDate;
  }
}
