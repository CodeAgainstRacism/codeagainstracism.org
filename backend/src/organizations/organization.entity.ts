import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import { User } from '../users/user.entity';

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

  @OneToOne(
    () => User,
    (user: User) => user.ownedOrganization,
  )
  adminUser: User;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  constructor(
    id?: number,
    EIN?: string,
    name?: string,
    description?: string,
    phoneNumber?: string,
    email?: string,
    contactFirstName?: string,
    contactLastName?: string,
  ) {
    this.id = id;
    this.EIN = EIN;
    this.name = name;
    this.description = description;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.contactFirstName = contactFirstName;
    this.contactLastName = contactLastName;
  }
}
