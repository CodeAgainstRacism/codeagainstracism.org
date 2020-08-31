import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/user.entity';
import { Project } from '../projects/project.entity';

@Entity()
export class Organization {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1 })
  id: number;

  @Column()
  @ApiProperty({ example: '12-3456789' })
  EIN: string;

  @Column()
  @ApiProperty({ example: 'Apple' })
  name: string;

  @Column({ length: '1023' })
  @ApiProperty({
    example:
      'Apple Inc. is an American multinational technology company headquartered in Cupertino, California, that designs, develops, and sells consumer electronics, computer software, and online services. It is considered one of the Big Tech technology companies, alongside Amazon, Google, Microsoft, and Facebook',
  })
  description: string;

  @Column()
  @ApiProperty({ example: '+001 (012) 012-0123' })
  phoneNumber: string;

  @Column({ unique: true })
  @ApiProperty({ example: 'stevejobs@apple.com' })
  email: string;

  @Column()
  @ApiProperty({ example: 'John' })
  contactFirstName: string;

  @Column()
  @ApiProperty({ example: 'Doe' })
  contactLastName: string;

  @Column()
  @CreateDateColumn()
  @ApiProperty({ example: new Date('2020-08-25T22:50:43.000Z') })
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  @ApiProperty({ example: new Date('2020-10-15T22:50:43.000Z') })
  updatedAt: Date;

  @OneToOne(
    () => User,
    (user: User) => user.ownedOrganization,
  )
  @ApiProperty({ example: User })
  adminUser: User;

  @OneToMany(
    () => Project,
    (project: Project) => project.organization,
  )
  @ApiProperty({ type: () => [Project] })
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
