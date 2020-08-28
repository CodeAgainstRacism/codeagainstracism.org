import { HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrganizationsService } from './organizations.service';
import { Organization } from './organization.entity';
import { OrganizationDto } from './organization.dto';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';

import {
  mockOrganizationEntities,
  newOrganizationDto,
  updateOrganizationDto,
} from '../utils/organization.constant';

const INVALID_ID = -1;

let mockDatabase: Organization[] = [];

const mockUsers = [
  new User(1, 'John', 'Doe', 'johndoe@email.com'),
  new User(2, 'Jane', 'Doe', 'janedoe@email.com'),
];

describe('OrganizationsService', () => {
  let service: OrganizationsService;
  let repo: Repository<Organization>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrganizationsService,
        {
          provide: UsersService,
          useValue: {
            findOne: jest
              .fn()
              .mockImplementation((id: number) =>
                mockUsers.find(user => user.id === id),
              ),
          },
        },
        {
          provide: getRepositoryToken(Organization),
          useValue: {
            find: jest.fn().mockResolvedValue(mockDatabase),

            findOne: jest
              .fn()
              .mockImplementation((id: number) =>
                mockDatabase.find(organization => organization.id === id),
              ),

            create: jest
              .fn()
              .mockImplementation((organization: OrganizationDto) => {
                const newOrganization = new Organization(
                  mockDatabase.length,
                  organization.EIN,
                  organization.name,
                  organization.description,
                  organization.phoneNumber,
                  organization.email,
                  organization.contactFirstName,
                  organization.contactLastName,
                );

                mockDatabase.push(newOrganization);
                return newOrganization;
              }),

            save: jest.fn(),

            update: jest
              .fn()
              .mockImplementation(
                (id: number, organizationData: OrganizationDto) => {
                  const organizationToUpdate = mockDatabase.find(
                    organization => organization.id === id,
                  );
                  // like Object.assign, but for defined properties
                  for (const key of Object.keys(organizationData)) {
                    const value = organizationData[key];
                    if (value !== undefined) {
                      organizationToUpdate[key] = value;
                    }
                  }
                },
              ),

            delete: jest.fn().mockImplementation((id: number) => {
              mockDatabase = mockDatabase.filter(
                organization => organization.id !== id,
              );
            }),
          },
        },
      ],
    }).compile();

    mockDatabase = mockOrganizationEntities.map(organization => ({
      ...organization,
    }));
    service = module.get<OrganizationsService>(OrganizationsService);
    repo = module.get<Repository<Organization>>(
      getRepositoryToken(Organization),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('find', () => {
    it('should get all the organizations', () => {
      service.findAll().then(data => {
        expect(data).toEqual(mockDatabase);
      });
    });
  });

  describe('findOne', () => {
    it('should get a single organization', () => {
      service.findOne(0).then(data => {
        expect(data).toEqual(mockDatabase[0]);
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
            error: `Organization with id:${INVALID_ID} not found`,
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
        .mockImplementationOnce(({ email }) =>
          Promise.resolve(
            mockDatabase.filter(organization => organization.email === email),
          ),
        );
    });

    it('should get a single organization with a valid email', () => {
      const expectedOrganization = mockDatabase[0];
      service.findByEmail(expectedOrganization.email).then(organization => {
        expect(organization.id).toEqual(expectedOrganization.id);
      });
    });

    it('should throw error with an invalid email', async () => {
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
            error: `Organization with email:${INVALID_EMAIL} not found`,
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
            mockDatabase.filter(organization => organization.email === email),
          ),
        );
    });

    it('should successfully create an organization', async () => {
      const beforeCount = mockDatabase.length;
      await service.create(newOrganizationDto);
      expect(mockDatabase.length).toEqual(beforeCount + 1);

      const createdOrganization = await service.findOne(beforeCount);
      expect(createdOrganization.EIN).toEqual(newOrganizationDto.EIN);
      expect(createdOrganization.name).toEqual(newOrganizationDto.name);
      expect(createdOrganization.description).toEqual(
        newOrganizationDto.description,
      );
      expect(createdOrganization.phoneNumber).toEqual(
        newOrganizationDto.phoneNumber,
      );
      expect(createdOrganization.email).toEqual(newOrganizationDto.email);
      expect(createdOrganization.contactFirstName).toEqual(
        newOrganizationDto.contactFirstName,
      );
      expect(createdOrganization.contactLastName).toEqual(
        newOrganizationDto.contactLastName,
      );
    });

    it('should throw an exception with an already used email', async () => {
      const newOrganizationWithSameEmail: OrganizationDto = {
        ...newOrganizationDto,
      };
      newOrganizationWithSameEmail.email = mockOrganizationEntities[0].email;

      let error;
      try {
        await service.create(newOrganizationWithSameEmail);
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
    it('should update an organization', async () => {
      const beforeUpdate = mockDatabase[0];
      await service.update(0, updateOrganizationDto);

      expect(mockDatabase[0].EIN).toEqual(updateOrganizationDto.EIN);
      expect(mockDatabase[0].name).toEqual(updateOrganizationDto.name);
      expect(mockDatabase[0].description).toEqual(
        updateOrganizationDto.description,
      );
      expect(mockDatabase[0].phoneNumber).toEqual(
        updateOrganizationDto.phoneNumber,
      );
      expect(mockDatabase[0].email).toEqual(updateOrganizationDto.email);
      expect(mockDatabase[0].contactFirstName).toEqual(
        updateOrganizationDto.contactFirstName,
      );
      expect(mockDatabase[0].contactLastName).toEqual(
        updateOrganizationDto.contactLastName,
      );
    });

    it('should throw an exception with a non existing id', async () => {
      let error;
      try {
        await service.update(INVALID_ID, updateOrganizationDto);
      } catch (e) {
        error = e;
      }

      expect(error).toEqual(
        new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: `Organization with id:${INVALID_ID} not found`,
          },
          HttpStatus.NOT_FOUND,
        ),
      );
    });
  });

  describe('remove', () => {
    it('should delete an organization', async () => {
      const beforeCount = mockDatabase.length;
      await service.remove(0);
      expect(mockDatabase.length).toEqual(beforeCount - 1);
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
            error: `Organization with id:${INVALID_ID} not found`,
          },
          HttpStatus.NOT_FOUND,
        ),
      );
    });
  });
});
