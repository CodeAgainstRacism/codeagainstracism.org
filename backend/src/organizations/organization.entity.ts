import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @Column()
  email: string;

  @Column()
  contactFirstName: string;

  @Column()
  contactLastName: string;

  @Column({ nullable: false })
  encryptedPassword: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
