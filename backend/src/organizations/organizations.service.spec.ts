import { HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrganizationsService } from './organizations.service';
import { Organization } from './organization.entity';
import { OrganizationDto } from './organization.dto';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';

const INVALID_ID = -1;

const mockData = [
  new Organization(
    0,
    '12-3456789',
    'organization name',
    'organization description',
    '+001 (012) 012-0123',
    'johndoe@email.com',
    'John',
    'Doe',
  ),
  new Organization(
    1,
    '34-5678901',
    'organization name 2',
    'organization description 2',
    '+002 (123) 456-7890',
    'janedoe@email.com',
    'Jane',
    'Doe',
  ),
];

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

    mockDatabase = mockData.map(organization => ({ ...organization }));
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
      const newOrganization: OrganizationDto = {
        EIN: '12-3456789',
        name: 'Apple',
        description: 'The apple company',
        phoneNumber: '+001 (012) 012-0123',
        email: 'stevejobs@apple.com',
        contactFirstName: 'Steve',
        contactLastName: 'Jobs',
        adminUserId: 1,
      };

      const beforeCount = mockDatabase.length;
      await service.create(newOrganization);
      expect(mockDatabase.length).toEqual(beforeCount + 1);

      const createdOrganization = await service.findOne(beforeCount);
      expect(createdOrganization.EIN).toEqual(newOrganization.EIN);
      expect(createdOrganization.name).toEqual(newOrganization.name);
      expect(createdOrganization.description).toEqual(
        newOrganization.description,
      );
      expect(createdOrganization.phoneNumber).toEqual(
        newOrganization.phoneNumber,
      );
      expect(createdOrganization.email).toEqual(newOrganization.email);
      expect(createdOrganization.contactFirstName).toEqual(
        newOrganization.contactFirstName,
      );
      expect(createdOrganization.contactLastName).toEqual(
        newOrganization.contactLastName,
      );
    });

    it('should throw an exception with an already used email', async () => {
      const newOrganizationWithSameEmail: OrganizationDto = {
        EIN: '12-3456789',
        name: 'Apple',
        description: 'The apple company',
        phoneNumber: '+001 (012) 012-0123',
        email: 'johndoe@email.com',
        contactFirstName: 'Steve',
        contactLastName: 'Jobs',
        adminUserId: 1,
      };

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
      const newData = {
        EIN: '00-0000000',
        name: 'new name',
        description: 'new description',
        phoneNumber: '+001 (000) 000-0000',
        email: undefined,
        contactFirstName: undefined,
        contactLastName: undefined,
        adminUserId: 1,
      };
      const beforeUpdate = mockDatabase[0];
      await service.update(0, newData);

      expect(mockDatabase[0].EIN).toEqual(newData.EIN);
      expect(mockDatabase[0].name).toEqual(newData.name);
      expect(mockDatabase[0].description).toEqual(newData.description);
      expect(mockDatabase[0].phoneNumber).toEqual(newData.phoneNumber);
      expect(mockDatabase[0].email).toEqual(beforeUpdate.email);
      expect(mockDatabase[0].contactFirstName).toEqual(
        beforeUpdate.contactFirstName,
      );
      expect(mockDatabase[0].contactLastName).toEqual(
        beforeUpdate.contactLastName,
      );
    });

    it('should update an organization', async () => {
      const newData = {
        EIN: undefined,
        name: undefined,
        description: undefined,
        phoneNumber: undefined,
        email: 'newemail@email.com',
        contactFirstName: 'Steve',
        contactLastName: 'Jobs',
        adminUserId: 1,
      };
      const beforeUpdate = mockDatabase[0];
      await service.update(0, newData);

      expect(mockDatabase[0].EIN).toEqual(beforeUpdate.EIN);
      expect(mockDatabase[0].name).toEqual(beforeUpdate.name);
      expect(mockDatabase[0].description).toEqual(beforeUpdate.description);
      expect(mockDatabase[0].phoneNumber).toEqual(beforeUpdate.phoneNumber);
      expect(mockDatabase[0].email).toEqual(newData.email);
      expect(mockDatabase[0].contactFirstName).toEqual(
        newData.contactFirstName,
      );
      expect(mockDatabase[0].contactLastName).toEqual(newData.contactLastName);
    });

    it('should throw an exception with a non existing id', async () => {
      const newData = {
        EIN: undefined,
        name: undefined,
        description: undefined,
        phoneNumber: undefined,
        email: undefined,
        contactFirstName: 'Steve',
        contactLastName: 'Jobs',
        adminUserId: 1,
      };

      let error;
      try {
        await service.update(INVALID_ID, newData);
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
