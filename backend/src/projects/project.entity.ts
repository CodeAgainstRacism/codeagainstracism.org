import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Organization } from '../organizations/organization.entity';
import { User } from '../users/user.entity';

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

  @Column({ default: false })
  @ApiProperty({ example: false })
  isCompleted: boolean;

  @Column({ default: null })
  @ApiProperty({ example: 'React.ts, apollo server(graphql), typeorm, any headless cms' })
  qualificationsNeeded: string;

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

  @ApiProperty({
    type: () => User,
  })
  @ManyToMany(
    () => User,
    (user: User) => user.likedProjects,
  )
  @JoinTable()
  likers: User[];

  /**
   * Calculated field (value: likers.length)
   */
  @Column()
  @ApiProperty({ example: 6 })
  likeCount: number;

  constructor(
    id?: number,
    name?: string,
    description?: string,
    startDate?: Date,
    endDate?: Date,
    imageURL?: string,
    isFeatured?: boolean,
    isCompleted?: boolean,
    organization?: Organization,
    likers?: User[],
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.startDate = startDate;
    this.endDate = endDate;
    this.imageURL = imageURL;
    this.isFeatured = isFeatured;
    this.isCompleted = isCompleted;
    this.organization = organization;
    this.likers = likers;
    this.likeCount = likers?.length ?? 0;
  }
}
