import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Organization } from '../organizations/organization.entity';
import { Project } from '../projects/project.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1 })
  id: number;

  @Column()
  @ApiProperty({ example: 'Jane' })
  firstName: string;

  @Column()
  @ApiProperty({ example: 'Doe' })
  lastName: string;
  
  @Column()
  @ApiProperty({ example: '+001 (012) 012-0123' })
  phoneNumber: string;

  @Column({ unique: true })
  @ApiProperty({ example: 'email@email.com' })
  email: string;

  @Column({ select: false })
  @Exclude({ toPlainOnly: true })
  encryptedPassword: string;

  @Column()
  @ApiProperty({
    example:
      '"John Doe" (for males) and "Jane Doe" (for females) are multiple-use names that are used when the true name of a person is unknown or is being intentionally concealed.',
  })
  description: string;

  @Column()
  @CreateDateColumn()
  @ApiProperty({ example: new Date('2020-07-11T13:08:16.364Z') })
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  @ApiProperty({ example: new Date('2020-07-12T22:50:43.000Z') })
  updatedAt: Date;

  @OneToOne(
    () => Organization,
    (organization: Organization) => organization.adminUser,
  )
  @JoinColumn()
  @ApiProperty({
    type: () => Organization,
  })
  ownedOrganization: Organization;

  @ApiProperty({
    type: () => Project,
  })
  @ManyToMany(
    () => Project,
    (project: Project) => project.likers,
  )
  likedProjects: Project[];

  constructor(
    id?: number,
    firstName?: string,
    lastName?: string,
    email?: string,
    encryptedPassword?: string,
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.encryptedPassword = encryptedPassword;
  }
}
