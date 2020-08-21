import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { User } from '../users/user.entity';
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
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(
    () => User,
    (user: User) => user.ownedOrganization,
  )
  adminUser: User;

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
    adminUser?: User,
  ) {
    this.id = id;
    this.EIN = EIN;
    this.name = name;
    this.description = description;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.contactFirstName = contactFirstName;
    this.contactLastName = contactLastName;
    this.adminUser = adminUser;
  }
}
