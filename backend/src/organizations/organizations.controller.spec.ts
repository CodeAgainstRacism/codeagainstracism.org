import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationsController } from './organizations.controller';
import { OrganizationDto } from './organization.dto';
import { OrganizationsService } from './organizations.service';
import { Organization } from './organization.entity';

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

describe('Organization Controller', () => {
  let controller: OrganizationsController;
  let service: OrganizationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganizationsController],

      providers: [
        {
          provide: OrganizationsService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(mockDatabase),

            findOne: jest
              .fn()
              .mockImplementation((id: number) =>
                Promise.resolve(
                  mockDatabase.find(organization => organization.id === id),
                ),
              ),

            create: jest
              .fn()
              .mockImplementation((organization: OrganizationDto) => {
                delete organization.password;
                return Promise.resolve({ id: 2, ...organization });
              }),

            update: jest
              .fn()
              .mockImplementation(
                (id: number, organizationData: OrganizationDto) => {
                  const organizationToUpdate = mockDatabase.find(
                    organization => organization.id === id,
                  );
                  delete organizationData.password;

                  // like Object.assign, but for defined properties
                  for (const key of Object.keys(organizationData)) {
                    const value = organizationData[key];
                    if (value !== undefined) {
                      organizationToUpdate[key] = value;
                    }
                  }
                  return Promise.resolve({ id: 0, ...organizationToUpdate });
                },
              ),

            remove: jest.fn().mockResolvedValue(Promise.resolve()),
          },
        },
      ],
    }).compile();

    mockDatabase = mockData.map(organization => ({ ...organization }));
    controller = module.get<OrganizationsController>(OrganizationsController);
    service = module.get<OrganizationsService>(OrganizationsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should get an array of organizations', () => {
      expect(controller.findAll()).resolves.toEqual(mockDatabase);
    });
  });

  describe('findOne', () => {
    it('should get an organization', () => {
      expect(controller.findOne('0')).resolves.toEqual(mockDatabase[0]);
      expect(controller.findOne('1')).resolves.toEqual(mockDatabase[1]);
    });
  });

  describe('create', () => {
    it('should create an organization', () => {
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
      expect(controller.create(newOrganization)).resolves.toEqual({
        id: 2,
        ...newOrganization,
      });
    });
  });

  describe('update', () => {
    it('should update an organization', async () => {
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
      const updatedOrganization = await controller.update('0', newData);
      expect(beforeUpdate.id).toEqual(updatedOrganization.id);
      expect(beforeUpdate.EIN).toEqual(updatedOrganization.EIN);
      expect(newData.name).toEqual(updatedOrganization.name);
      expect(beforeUpdate.description).toEqual(updatedOrganization.description);
      expect(beforeUpdate.phoneNumber).toEqual(updatedOrganization.phoneNumber);
      expect(newData.email).toEqual(updatedOrganization.email);
      expect(beforeUpdate.contactFirstName).toEqual(
        updatedOrganization.contactFirstName,
      );
      expect(beforeUpdate.contactLastName).toEqual(
        updatedOrganization.contactLastName,
      );
      expect(beforeUpdate.EIN).toEqual(updatedOrganization.EIN);
      expect(beforeUpdate.EIN).toEqual(updatedOrganization.EIN);
      expect(beforeUpdate.EIN).toEqual(updatedOrganization.EIN);
    });
  });

  describe('update', () => {
    it('should delete an organization', async () => {
      //! nothing is returns so it only tests if it crashes
      await controller.remove('0');
    });
  });
});
