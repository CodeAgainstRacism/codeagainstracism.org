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
  updateOrganizationDtoWithoutPassword
} from '../utils/organization.constant';

const mockProjectsData = [
  new Project(
    0,
    'Code Against Racism',
    'A cool project !',
    new Date('2020/06/15'),
    undefined,
    null,
  ),
  new Project(
    1,
    'spark',
    'A simple cli to input and store your ideas directly with git and without a text editor',
    new Date('2020/06/05'),
    new Date('2020/06/15'),
    mockOrganizationEntities[1],
  ),
  new Project(
    2,
    'Code Against Racism',
    'A cool project !',
    new Date('2020/06/15'),
    undefined,
    mockOrganizationEntities[1],
  ),
];

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

    //mockDatabase = mockOrganizationEntities.map(organization => ({ ...organization }));
    mockDatabase = mockOrganizationEntities.map(organization => ({
      ...organization,
    }));
    mockProjectDatabase = mockProjectsData.map(project => ({ ...project }));
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

  describe('findProjects', () => {
    it('should return a list of projects', async () => {
      const projects = mockProjectDatabase.filter(
        project => project.organization?.id === 1,
      );
      expect(controller.findProjects('1')).resolves.toEqual(projects);
    });
    it('should return an empty list of projects', async () => {
      expect(controller.findProjects('0')).resolves.toEqual([]);
    });
  });

  describe('create', () => {
    it('should create an organization', () => {
      expect(controller.create(newOrganizationDto)).resolves.toEqual({
        id: 2,
        ...newOrganizationDto,
      });
    });
  });

  describe('update', () => {
    it('should update an organization', async () => {
      updateOrganizationDtoWithoutPassword;
      const beforeUpdate = mockDatabase[0];
      const updatedOrganization = await controller.update(
        '0',
        updateOrganizationDtoWithoutPassword,
      );
      expect(beforeUpdate.id).toEqual(updatedOrganization.id);
      expect(beforeUpdate.EIN).toEqual(updatedOrganization.EIN);
      expect(updateOrganizationDtoWithoutPassword.name).toEqual(updatedOrganization.name);
      expect(beforeUpdate.description).toEqual(updatedOrganization.description);
      expect(beforeUpdate.phoneNumber).toEqual(updatedOrganization.phoneNumber);
      expect(updateOrganizationDtoWithoutPassword.email).toEqual(updatedOrganization.email);
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
