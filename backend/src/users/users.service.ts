import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { encryptPassword } from '../utils/utils';
import { UserDto } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(userDto: UserDto): Promise<User> {
    const sameEmailUser = await this.usersRepository.find({
      email: userDto.email,
    });

    if (sameEmailUser.length !== 0) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: 'Email already used',
        },
        HttpStatus.CONFLICT,
      );
    }

    const user = this.usersRepository.create(userDto);
    user.encryptedPassword = encryptPassword(userDto.password);

    return this.usersRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne(id, {
      relations: ['ownedOrganization'],
    });

    if (user === undefined) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `User with id:${id} not found`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const usersFound = await this.usersRepository.find({
      where: { email },
      select: ['id', 'firstName', 'lastName', 'email', 'encryptedPassword'],
    });

    if (usersFound.length === 0) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `User with email:${email} not found`,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return usersFound[0];
  }

  public async update(id: number, userDto: UserDto): Promise<User> {
    await this.findOne(id); // checks if the user exists
    if (userDto.password) {
      await this.usersRepository.update(id, {
        encryptedPassword: encryptPassword(userDto.password),
      });
      delete userDto.password;
    }
    await this.usersRepository.update(id, userDto);

    return this.usersRepository.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id); // checks if the user exists
    await this.usersRepository.delete(id);
  }
}
