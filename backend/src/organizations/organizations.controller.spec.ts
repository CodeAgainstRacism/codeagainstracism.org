import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { OrganizationsController } from './organizations.controller';
import { OrganizationDto } from './organization.dto';
import { OrganizationsService } from './organizations.service';
import { Organization } from './organization.entity';
import { ProjectsService } from '../projects/projects.service';
import { Project } from '../projects/project.entity';

import {
  mockOrganizationEntities,
  newOrganizationDto,
  updateOrganizationDto,
} from '../utils/organization.constant';
import { mockProjectEntities } from '../utils/project.constant';

let mockProjectDatabase: Project[] = [];
let mockDatabase: Organization[] = [];

describe('Organization Controller', () => {
  let controller: OrganizationsController;
  let service: OrganizationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganizationsController],
      providers: [
        ProjectsService,
        {
          provide: getRepositoryToken(Project),
          useValue: { find: jest.fn().mockResolvedValue(mockProjectDatabase) },
        },
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
                return Promise.resolve({ id: 2, ...organization });
              }),

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
                  return Promise.resolve({ id: 0, ...organizationToUpdate });
                },
              ),

            remove: jest.fn().mockResolvedValue(Promise.resolve()),
          },
        },
      ],
    }).compile();

    mockDatabase = mockOrganizationEntities.map(organization => ({
      ...organization,
    }));
    mockProjectDatabase = mockProjectEntities.map(project => ({ ...project }));
    controller = module.get<OrganizationsController>(OrganizationsController);
    service = module.get<OrganizationsService>(OrganizationsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should get an array of organizations', () => {
      controller.findAll().then(data => {
        expect(data).toEqual(mockDatabase);
      });
    });
  });

  describe('findOne', () => {
    it('should get an organization', () => {
      controller.findOne('0').then(data => {
        expect(data).toEqual(mockDatabase[0]);
      });
    });
  });

  describe('create', () => {
    it('should create an organization', () => {
      const beforeCount = mockDatabase.length;
      const expected = { ...newOrganizationDto };
      controller.create({ ...newOrganizationDto }).then(data => {
        expect(data).toEqual({
          id: beforeCount,
          ...expected,
        });
      });
    });
  });

  describe('update', () => {
    it('should update an organization', async () => {
      const beforeUpdate = mockDatabase[0];
      const updatedOrganization = await controller.update('0', {
        ...updateOrganizationDto,
      });
      expect(beforeUpdate.id).toEqual(updatedOrganization.id);
      expect(beforeUpdate.EIN).toEqual(updateOrganizationDto.EIN);
      expect(updateOrganizationDto.name).toEqual(
        updatedOrganization.name,
      );
      expect(beforeUpdate.description).toEqual(updateOrganizationDto.description);
      expect(beforeUpdate.phoneNumber).toEqual(updateOrganizationDto.phoneNumber);
      expect(updateOrganizationDto.email).toEqual(
        updatedOrganization.email,
      );
      expect(beforeUpdate.contactFirstName).toEqual(
        updateOrganizationDto.contactFirstName,
      );
      expect(beforeUpdate.contactLastName).toEqual(
        updateOrganizationDto.contactLastName,
      );
      expect(beforeUpdate.EIN).toEqual(updateOrganizationDto.EIN);
      expect(beforeUpdate.EIN).toEqual(updateOrganizationDto.EIN);
      expect(beforeUpdate.EIN).toEqual(updateOrganizationDto.EIN);
    });
  });

  describe('remove', () => {
    it('should delete an organization', async () => {
      //! nothing is returns so it only tests if it crashes
      await controller.remove('0');
    });
  });
});
