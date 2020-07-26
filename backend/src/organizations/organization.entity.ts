import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Project } from '../projects/project.entity';

@Entity()
export class Organization {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  EIN: string;

  @Column()
  name: string;

  @Column({ length: '1023' })
  description: string;

  @Column()
  phoneNumber: string;

  @Column({ unique: true })
  email: string;

  @Column()
  contactFirstName: string;

  @Column()
  contactLastName: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  encryptedPassword: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(
    () => Project,
    (project: Project) => project.organization,
  )
  projects: Project[];

  constructor(
    id?: number,
    EIN?: string,
    name?: string,
    description?: string,
    phoneNumber?: string,
    email?: string,
    contactFirstName?: string,
    contactLastName?: string,
    encryptedPassword?: string,
  ) {
    this.id = id;
    this.EIN = EIN;
    this.name = name;
    this.description = description;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.contactFirstName = contactFirstName;
    this.contactLastName = contactLastName;
    this.encryptedPassword = encryptedPassword;
  }
}
