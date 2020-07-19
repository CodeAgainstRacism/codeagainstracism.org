import { HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectsService } from './projects.service';
import { Project } from './project.entity';
import { ProjectDto } from './project.dto';
import { OrganizationsService } from '../organizations/organizations.service';
import { Organization } from '../organizations/organization.entity';

const INVALID_ID = -1;

const mockData = [
  new Project(
    0,
    'Code Against Racism',
    'A cool project !',
    new Date('2020/06/15'),
    null,
  ),
  new Project(
    1,
    'spark',
    'A simple cli to input and store your ideas directly with git and without a text editor',
    new Date('2020/06/05'),
    new Date('2020/06/15'),
    new Organization(1),
  ),
];

const mockOrganizationData = [
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

let mockDatabase: Project[] = [];
let mockOrganizationDatabase: Organization[] = [];

describe('ProjectsService', () => {
  let service: ProjectsService;
  let repo: Repository<Project>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectsService,
        {
          provide: OrganizationsService,
          useValue: {
            findOne: jest
              .fn()
              .mockImplementation((id: number) =>
                mockOrganizationDatabase.find(
                  organization => organization.id === id,
                ),
              ),
          },
        },
        //OrganizationsService,
        //{
        //  provide: getRepositoryToken(Organization),
        //  useValue: {},
        //},
        {
          provide: getRepositoryToken(Project),
          useValue: {
            find: jest.fn().mockResolvedValue(mockDatabase),

            findOne: jest
              .fn()
              .mockImplementation((id: number) =>
                mockDatabase.find(project => project.id === id),
              ),

            create: jest.fn().mockImplementation((project: ProjectDto) => {
              const newProject = new Project(
                mockDatabase.length,
                project.name,
                project.description,
                project.startDate,
                project.endDate,
              );

              mockDatabase.push(newProject);
              return newProject;
            }),

            save: jest.fn(),

            update: jest
              .fn()
              .mockImplementation((id: number, projectData: ProjectDto) => {
                const projectToUpdate = mockDatabase.find(
                  project => project.id === id,
                );

                // like Object.assign, but for defined properties
                for (const key of Object.keys(projectData)) {
                  const value = projectData[key];
                  if (value !== undefined) {
                    projectToUpdate[key] = value;
                  }
                }
              }),

            delete: jest.fn().mockImplementation((id: number) => {
              mockDatabase = mockDatabase.filter(project => project.id !== id);
            }),
          },
        },
      ],
    }).compile();

    mockDatabase = mockData.map(project => ({ ...project }));
    mockOrganizationDatabase = mockOrganizationData.map(organization => ({
      ...organization,
    }));
    service = module.get<ProjectsService>(ProjectsService);
    repo = module.get<Repository<Project>>(getRepositoryToken(Project));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('find', () => {
    it('should get all the projects', () => {
      expect(service.findAll()).resolves.toEqual(mockDatabase);
    });
  });

  describe('findOne', () => {
    it('should get a single project', () => {
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
            error: `Project with id:${INVALID_ID} not found`,
          },
          HttpStatus.NOT_FOUND,
        ),
      );
    });
  });

  describe('create', () => {
    it('should successfully create a project', async () => {
      const newProject: ProjectDto = {
        name: 'The iPhone',
        description: 'Top secret new phone',
        startDate: new Date('2004/01/01'),
        endDate: new Date('2007/06/29'),
        organizationId: undefined,
      };

      const beforeCount = mockDatabase.length;
      await service.create(newProject);
      expect(mockDatabase.length).toEqual(beforeCount + 1);

      const createdProject = await service.findOne(beforeCount);
      expect(createdProject.name).toEqual(newProject.name);
      expect(createdProject.description).toEqual(newProject.description);
      expect(createdProject.startDate).toEqual(newProject.startDate);
      expect(createdProject.endDate).toEqual(newProject.endDate);
    });

    it('should successfully create a project without a end date', async () => {
      const newProject: ProjectDto = {
        name: 'The iPhone',
        description: 'Top secret new phone',
        startDate: new Date('2004/01/01'),
        endDate: undefined,
        organizationId: undefined,
      };

      const beforeCount = mockDatabase.length;
      await service.create(newProject);
      expect(mockDatabase.length).toEqual(beforeCount + 1);

      const createdProject = await service.findOne(beforeCount);
      expect(createdProject.name).toEqual(newProject.name);
      expect(createdProject.description).toEqual(newProject.description);
      expect(createdProject.startDate).toEqual(newProject.startDate);
      expect(createdProject.endDate).toEqual(newProject.endDate);
    });

    it('should successfully create a project without a different date format', async () => {
      const newProject: ProjectDto = {
        name: 'The iPhone',
        description: 'Top secret new phone',
        startDate: new Date('2004/01/01'),
        endDate: undefined,
        organizationId: undefined,
      };

      const beforeCount = mockDatabase.length;
      await service.create(newProject);
      expect(mockDatabase.length).toEqual(beforeCount + 1);

      const createdProject = await service.findOne(beforeCount);
      expect(createdProject.name).toEqual(newProject.name);
      expect(createdProject.description).toEqual(newProject.description);
      expect(createdProject.startDate).toEqual(newProject.startDate);
      expect(createdProject.endDate).toEqual(newProject.endDate);
    });

    it('should successfully create a project with an organization', async () => {
      const newProject: ProjectDto = {
        name: 'The iPhone',
        description: 'Top secret new phone',
        startDate: new Date('2004/01/01'),
        endDate: new Date('2007/06/29'),
        organizationId: 0,
      };

      const beforeCount = mockDatabase.length;
      await service.create(newProject);
      expect(mockDatabase.length).toEqual(beforeCount + 1);

      const createdProject = await service.findOne(beforeCount);
      expect(createdProject.name).toEqual(newProject.name);
      expect(createdProject.description).toEqual(newProject.description);
      expect(createdProject.startDate).toEqual(newProject.startDate);
      expect(createdProject.endDate).toEqual(newProject.endDate);
      expect(createdProject.organization).toEqual(mockOrganizationDatabase[0]);
    });
  });

  describe('update', () => {
    it('should update a project', async () => {
      const newData: ProjectDto = {
        name: 'A new name !',
        description: 'A new description',
        startDate: undefined,
        endDate: undefined,
        organizationId: undefined,
      };
      const beforeUpdate = mockDatabase[0];
      await service.update(0, newData);

      const updatedProject = await service.findOne(0);

      expect(mockDatabase[0].name).toEqual(updatedProject.name);
      expect(mockDatabase[0].description).toEqual(updatedProject.description);
      expect(mockDatabase[0].startDate).toEqual(updatedProject.startDate);
      expect(beforeUpdate.startDate).toEqual(updatedProject.startDate);
      expect(mockDatabase[0].endDate).toEqual(updatedProject.endDate);
      expect(beforeUpdate.endDate).toEqual(updatedProject.endDate);
    });

    it('should throw an exception with a non existing id', async () => {
      const newData: ProjectDto = {
        name: 'A new name !',
        description: 'A new description',
        startDate: undefined,
        endDate: undefined,
        organizationId: undefined,
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
            error: `Project with id:${INVALID_ID} not found`,
          },
          HttpStatus.NOT_FOUND,
        ),
      );
    });
  });

  describe('remove', () => {
    it('should delete a project', async () => {
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
            error: `Project with id:${INVALID_ID} not found`,
          },
          HttpStatus.NOT_FOUND,
        ),
      );
    });
  });
});
