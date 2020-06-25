import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { OrganizationsService } from './organizations.service';
import { Organization } from './organization.entity';
import { OrganizationDto } from './organization.dto';

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
              .mockImplementation((id: String) =>
                mockDatabase.find(
                  organization => organization.id === Number(id),
                ),
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
                    organization => organization.id === Number(id),
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

            delete: jest.fn().mockImplementation((id: String) => {
              mockDatabase = mockDatabase.filter(
                organization => organization.id !== Number(id),
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
      expect(service.findOne('0')).toEqual(mockDatabase[0]);
    });
  });

  describe('create', () => {
    it('should successfully create an organization', async () => {
      const newOrganization: OrganizationDto = {
        EIN: '12-3456789',
        name: 'Apple',
        description: 'The apple company',
        phoneNumber: '+001 (012) 012-0123',
        email: 'stevejobs@apple.com',
        password: 'strongpassword',
        contactFirstName: 'Steve',
        contactLastName: 'Jobs',
      };

      const beforeCount = mockDatabase.length;
      await service.create(newOrganization);
      expect(mockDatabase.length).toEqual(beforeCount + 1);

      const createdOrganization = await service.findOne(String(beforeCount));
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
  });

  describe('update', () => {
    it('should update an organization without password', async () => {
      const newData = {
        EIN: undefined,
        name: 'new name',
        description: undefined,
        phoneNumber: undefined,
        email: 'newemail@email.com',
        password: undefined,
        contactFirstName: undefined,
        contactLastName: undefined,
      };
      const beforeUpdate = mockDatabase[0];
      await service.update(0, newData);

      expect(mockDatabase[0].EIN).toEqual(beforeUpdate.EIN);
      expect(mockDatabase[0].name).toEqual(newData.name);
      expect(mockDatabase[0].description).toEqual(beforeUpdate.description);
      expect(mockDatabase[0].phoneNumber).toEqual(beforeUpdate.phoneNumber);
      expect(mockDatabase[0].email).toEqual(newData.email);
      expect(mockDatabase[0].contactFirstName).toEqual(
        beforeUpdate.contactFirstName,
      );
      expect(mockDatabase[0].contactLastName).toEqual(
        beforeUpdate.contactLastName,
      );
    });

    it('should update an organization with password', async () => {
      const newData = {
        EIN: undefined,
        name: undefined,
        description: undefined,
        phoneNumber: undefined,
        email: undefined,
        password: 'new password',
        contactFirstName: 'Steve',
        contactLastName: 'Jobs',
      };
      const password = newData.password;
      const beforeUpdate = mockDatabase[0];
      await service.update(0, newData);

      expect(
        bcrypt.compareSync(password, mockDatabase[0].encryptedPassword),
      ).toBeTruthy();

      expect(mockDatabase[0].EIN).toEqual(beforeUpdate.EIN);
      expect(mockDatabase[0].name).toEqual(beforeUpdate.name);
      expect(mockDatabase[0].description).toEqual(beforeUpdate.description);
      expect(mockDatabase[0].phoneNumber).toEqual(beforeUpdate.phoneNumber);
      expect(mockDatabase[0].email).toEqual(beforeUpdate.email);
      expect(mockDatabase[0].contactFirstName).toEqual(
        newData.contactFirstName,
      );
      expect(mockDatabase[0].contactLastName).toEqual(newData.contactLastName);
    });
  });

  describe('remove', () => {
    it('should delete an organization', async () => {
      const beforeCount = mockDatabase.length;
      await service.remove('0');
      expect(mockDatabase.length).toEqual(beforeCount - 1);
    });
  });
});
