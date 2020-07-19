import { HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { OrganizationsService } from './organizations.service';
import { Organization } from './organization.entity';
import { OrganizationDto } from './organization.dto';

import {
  mockOrganizationEntities,
  newOrganizationDto,
  updateOrganizationDtoWithPassword,
  updateOrganizationDtoWithoutPassword,
} from '../utils/organization.constant';

const INVALID_ID = -1;

let mockDatabase: Organization[] = [];

describe('OrganizationsService', () => {
  let service: OrganizationsService;
  let repo: Repository<Organization>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrganizationsService,
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
                  if (organizationData.password) {
                    organizationToUpdate.encryptedPassword = OrganizationsService.encrypt(
                      organizationData.password,
                    );
                    delete organizationData.password;
                  }
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

  describe('util functions', () => {
    it('should encrypt the password', () => {
      expect(
        bcrypt.compareSync(
          'password',
          OrganizationsService.encrypt('password'),
        ),
      ).toBeTruthy();
      expect(
        bcrypt.compareSync('', OrganizationsService.encrypt('')),
      ).toBeTruthy();
    });
    it('should detect that its the wrong password', () => {
      expect(
        bcrypt.compareSync(
          'not same password',
          OrganizationsService.encrypt('password'),
        ),
      ).toBeFalsy();
    });
  });

  describe('find', () => {
    it('should get all the organizations', () => {
      expect(service.findAll()).resolves.toEqual(mockDatabase);
    });
  });

  describe('findOne', () => {
    it('should get a single organization', () => {
      expect(service.findOne(0)).resolves.toEqual(mockDatabase[0]);
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

    it('should get a single organization with a valid email', async () => {
      const expectedOrganization = mockDatabase[0];
      const organization = await service.findByEmail(
        expectedOrganization.email,
      );
      expect(organization.id).toEqual(expectedOrganization.id);
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
    it('should update an organization without password', async () => {
      const beforeUpdate = mockDatabase[0];
      await service.update(0, updateOrganizationDtoWithoutPassword);

      expect(mockDatabase[0].EIN).toEqual(beforeUpdate.EIN);
      expect(mockDatabase[0].name).toEqual(
        updateOrganizationDtoWithoutPassword.name,
      );
      expect(mockDatabase[0].description).toEqual(beforeUpdate.description);
      expect(mockDatabase[0].phoneNumber).toEqual(beforeUpdate.phoneNumber);
      expect(mockDatabase[0].email).toEqual(
        updateOrganizationDtoWithoutPassword.email,
      );
      expect(mockDatabase[0].contactFirstName).toEqual(
        beforeUpdate.contactFirstName,
      );
      expect(mockDatabase[0].contactLastName).toEqual(
        beforeUpdate.contactLastName,
      );
    });

    it('should update an organization with password', async () => {
      const password = updateOrganizationDtoWithPassword.password;
      const beforeUpdate = mockDatabase[0];
      await service.update(0, updateOrganizationDtoWithPassword);

      expect(
        bcrypt.compareSync(password, mockDatabase[0].encryptedPassword),
      ).toBeTruthy();

      expect(mockDatabase[0].EIN).toEqual(beforeUpdate.EIN);
      expect(mockDatabase[0].name).toEqual(beforeUpdate.name);
      expect(mockDatabase[0].description).toEqual(beforeUpdate.description);
      expect(mockDatabase[0].phoneNumber).toEqual(beforeUpdate.phoneNumber);
      expect(mockDatabase[0].email).toEqual(beforeUpdate.email);
      expect(mockDatabase[0].contactFirstName).toEqual(
        updateOrganizationDtoWithPassword.contactFirstName,
      );
      expect(mockDatabase[0].contactLastName).toEqual(
        updateOrganizationDtoWithPassword.contactLastName,
      );
    });

    it('should throw an exception with a non existing id', async () => {
      let error;
      try {
        await service.update(INVALID_ID, updateOrganizationDtoWithPassword);
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
