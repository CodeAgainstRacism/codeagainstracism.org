import { HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from './users.service';
import { UserDto } from './user.dto';
import { User } from './user.entity';
import { encryptPassword, isValidPassword } from '../utils/utils';

import {
  mockUserEntities,
  newUserDto,
  updateUserDto,
} from '../utils/user.constant';

const INVALID_ID = -1;

let mockUserDatabase: User[] = [];

describe('UsersService', () => {
  let service: UsersService;
  let repo: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            find: jest.fn().mockResolvedValue(mockUserDatabase),

            findOne: jest
              .fn()
              .mockImplementation((id: number) =>
                mockUserDatabase.find(user => user.id === id),
              ),

            create: jest.fn().mockImplementation((userDto: UserDto) => {
              const newUser = new User(
                mockUserDatabase.length,
                userDto.firstName,
                userDto.lastName,
                userDto.email,
                encryptPassword(userDto.password),
              );

              mockUserDatabase.push(newUser);
              return newUser;
            }),

            save: jest.fn(),

            update: jest
              .fn()
              .mockImplementation((id: number, userDto: UserDto) => {
                const userToUpdate = mockUserDatabase.find(
                  user => user.id === id,
                );
                if (userDto.password) {
                  userToUpdate.encryptedPassword = encryptPassword(
                    userDto.password,
                  );
                  delete userDto.password;
                }
                // like Object.assign, but for defined properties
                for (const key of Object.keys(userDto)) {
                  const value = userDto[key];
                  if (value !== undefined) {
                    userToUpdate[key] = value;
                  }
                }
              }),

            delete: jest.fn().mockImplementation((id: number) => {
              mockUserDatabase = mockUserDatabase.filter(
                user => user.id !== id,
              );
            }),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    mockUserDatabase = mockUserEntities.map(user => ({
      ...user,
    }));
    repo = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('find', () => {
    it('should return an array users', () => {
      service.findAll().then(data => {
        expect(data).toEqual(mockUserDatabase);
      });
    });
  });

  describe('findOne', () => {
    it('should return a user', () => {
      service.findOne(0).then(data => {
        expect(data).toEqual(mockUserDatabase[0]);
      });
    });

    it('should throw an exception with a non existing id', async () => {
      let error;
      try {
        await service.findOne(INVALID_ID);
      } catch (e) {
        error = e;
      }
      expect(error).toEqual(
        new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: `User with id:${INVALID_ID} not found`,
          },
          HttpStatus.NOT_FOUND,
        ),
      );
    });
  });

  describe('findByEmail', () => {
    const INVALID_EMAIL = 'a@a.com';

    beforeEach(() => {
      jest
        .spyOn(repo, 'find')
        .mockImplementationOnce(args =>
          Promise.resolve(
            mockUserDatabase.filter(user => user.email === args['where'].email),
          ),
        );
    });

    it('should get a single user with a valid email', () => {
      const expectedUser = mockUserDatabase[0];
      service.findByEmail(expectedUser.email).then(user => {
        expect(user.id).toEqual(user.id);
      });
    });

    it('should throw error due to an invalid email', async () => {
      let error;
      try {
        await service.findByEmail(INVALID_EMAIL);
      } catch (e) {
        error = e;
      }
      expect(error).toEqual(
        new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: `User with email:${INVALID_EMAIL} not found`,
          },
          HttpStatus.NOT_FOUND,
        ),
      );
    });
  });

  describe('create', () => {
    beforeEach(() => {
      jest
        .spyOn(repo, 'find')
        .mockImplementationOnce(({ email }) =>
          Promise.resolve(
            mockUserDatabase.filter(user => user.email === email),
          ),
        );
    });

    it('should successfully create a user', async () => {
      const beforeCount = mockUserDatabase.length;
      await service.create(newUserDto);
      expect(mockUserDatabase.length).toEqual(beforeCount + 1);

      const createdUser = await service.findOne(beforeCount);
      expect(createdUser.id).toEqual(mockUserDatabase.length - 1);
      expect(createdUser.firstName).toEqual(newUserDto.firstName);
      expect(createdUser.lastName).toEqual(newUserDto.lastName);
      expect(createdUser.email).toEqual(newUserDto.email);
      expect(createdUser.firstName).toEqual(newUserDto.firstName);
      expect(
        isValidPassword(newUserDto.password, createdUser.encryptedPassword),
      ).toBeTruthy();
    });

    it('should throw an exception with an already used email', async () => {
      const newUserWithExistingEmail: UserDto = {
        ...newUserDto,
      };
      newUserWithExistingEmail.email = mockUserDatabase[0].email;

      let error;
      try {
        await service.create(newUserWithExistingEmail);
      } catch (e) {
        error = e;
      }

      expect(error).toEqual(
        new HttpException(
          {
            status: HttpStatus.CONFLICT,
            error: 'Email already used',
          },
          HttpStatus.CONFLICT,
        ),
      );
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const beforeUpdate = { ...mockUserDatabase[0] };
      await service.update(0, { ...updateUserDto });

      expect(mockUserDatabase[0].id).toEqual(beforeUpdate.id);
      expect(mockUserDatabase[0].firstName).toEqual(updateUserDto.firstName);
      expect(mockUserDatabase[0].lastName).toEqual(updateUserDto.lastName);
      expect(mockUserDatabase[0].email).toEqual(updateUserDto.email);
      expect(
        isValidPassword(
          updateUserDto.password,
          mockUserDatabase[0].encryptedPassword,
        ),
      ).toBeTruthy();
    });

    it('should update a user without password', async () => {
      const beforeUpdate = { ...mockUserDatabase[0] };
      const updateDto = { ...updateUserDto };
      delete updateDto.password;
      await service.update(0, updateDto);

      expect(mockUserDatabase[0].id).toEqual(beforeUpdate.id);
      expect(mockUserDatabase[0].firstName).toEqual(updateUserDto.firstName);
      expect(mockUserDatabase[0].lastName).toEqual(updateUserDto.lastName);
      expect(mockUserDatabase[0].email).toEqual(updateUserDto.email);
      expect(beforeUpdate.encryptedPassword).toEqual(
        mockUserDatabase[0].encryptedPassword,
      );
    });

    it('should throw an exception with a non existing id', async () => {
      let error;
      try {
        await service.update(INVALID_ID, updateUserDto);
      } catch (e) {
        error = e;
      }

      expect(error).toEqual(
        new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: `User with id:${INVALID_ID} not found`,
          },
          HttpStatus.NOT_FOUND,
        ),
      );
    });
  });

  describe('remove', () => {
    it('should remove a user from the database', async () => {
      const beforeCount = mockUserDatabase.length;
      await service.remove(0);
      expect(mockUserDatabase.length).toEqual(beforeCount - 1);
    });

    it('should throw an exception with a non existing id', async () => {
      let error;
      try {
        await service.remove(INVALID_ID);
      } catch (e) {
        error = e;
      }
      expect(error).toEqual(
        new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: `User with id:${INVALID_ID} not found`,
          },
          HttpStatus.NOT_FOUND,
        ),
      );
    });
  });
});
