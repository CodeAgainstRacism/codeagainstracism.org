import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Organization } from '../organizations/organization.entity';

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

  @Column({ unique: true })
  @ApiProperty({ example: 'email@email.com' })
  email: string;

  @Column({ select: false })
  @Exclude({ toPlainOnly: true })
  encryptedPassword: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({
    type: () => Organization,
  })
  @OneToOne(
    () => Organization,
    (organization: Organization) => organization.adminUser,
  )
  @JoinColumn()
  ownedOrganization: Organization;

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
