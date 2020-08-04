import { HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectsService } from './projects.service';
import { Project } from './project.entity';
import { ProjectDto } from './project.dto';
import { OrganizationsService } from '../organizations/organizations.service';
import { Organization } from '../organizations/organization.entity';

import { mockOrganizationEntities } from '../utils/organization.constant';
import {
  mockProjectEntities,
  newProjectDto,
  updateProjectDto,
} from '../utils/project.constant';

const INVALID_ID = -1;

let mockProjectDatabase: Project[] = [];
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
        {
          provide: getRepositoryToken(Project),
          useValue: {
            find: jest.fn().mockResolvedValue(mockProjectDatabase),

            findOne: jest
              .fn()
              .mockImplementation((id: number) =>
                mockProjectDatabase.find(project => project.id === id),
              ),

            create: jest.fn().mockImplementation((project: ProjectDto) => {
              const newProject = new Project(
                mockProjectDatabase.length,
                project.name,
                project.description,
                project.startDate,
                project.endDate,
              );

              mockProjectDatabase.push(newProject);
              return newProject;
            }),

            save: jest.fn(),

            update: jest
              .fn()
              .mockImplementation((id: number, projectData: ProjectDto) => {
                const projectToUpdate = mockProjectDatabase.find(
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
              mockProjectDatabase = mockProjectDatabase.filter(
                project => project.id !== id,
              );
            }),
          },
        },
      ],
    }).compile();

    mockProjectDatabase = mockProjectEntities.map(project => ({ ...project }));
    mockOrganizationDatabase = mockOrganizationEntities.map(organization => ({
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
      service.findAll().then(data => {
        expect(data).toEqual(mockProjectDatabase);
      });
    });
  });

  describe('findOne', () => {
    it('should get a single project', () => {
      service.findOne(0).then(data => {
        expect(data).toEqual(mockProjectDatabase[0]);
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
            error: `Project with id:${INVALID_ID} not found`,
          },
          HttpStatus.NOT_FOUND,
        ),
      );
    });
  });

  describe('create', () => {
    it('should successfully create a project', async () => {
      const beforeCount = mockProjectDatabase.length;
      await service.create(newProjectDto);
      expect(mockProjectDatabase.length).toEqual(beforeCount + 1);

      const createdProject = await service.findOne(beforeCount);
      expect(createdProject.name).toEqual(newProjectDto.name);
      expect(createdProject.description).toEqual(newProjectDto.description);
      expect(createdProject.startDate).toEqual(newProjectDto.startDate);
      expect(createdProject.endDate).toEqual(newProjectDto.endDate);
    });

    it('should successfully create a project without a end date', async () => {
      const newProjectWithoutEndDate: ProjectDto = { ...newProjectDto };
      delete newProjectWithoutEndDate.endDate;

      const beforeCount = mockProjectDatabase.length;
      await service.create(newProjectWithoutEndDate);
      expect(mockProjectDatabase.length).toEqual(beforeCount + 1);

      const createdProject = await service.findOne(beforeCount);
      expect(createdProject.name).toEqual(newProjectWithoutEndDate.name);
      expect(createdProject.description).toEqual(
        newProjectWithoutEndDate.description,
      );
      expect(createdProject.startDate).toEqual(
        newProjectWithoutEndDate.startDate,
      );
      expect(createdProject.endDate).toEqual(newProjectWithoutEndDate.endDate);
    });

    it('should successfully create a project with an organization', async () => {
      const newProject: ProjectDto = { ...newProjectDto };
      newProject.organizationId = 0;

      const beforeCount = mockProjectDatabase.length;
      await service.create(newProject);
      expect(mockProjectDatabase.length).toEqual(beforeCount + 1);

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
      const beforeUpdate = mockProjectDatabase[0];
      await service.update(0, updateProjectDto);

      const updatedProject = await service.findOne(0);

      expect(mockProjectDatabase[0].name).toEqual(updatedProject.name);
      expect(mockProjectDatabase[0].description).toEqual(
        updatedProject.description,
      );
      expect(mockProjectDatabase[0].startDate).toEqual(
        updatedProject.startDate,
      );
      expect(beforeUpdate.startDate).toEqual(updatedProject.startDate);
      expect(mockProjectDatabase[0].endDate).toEqual(updatedProject.endDate);
      expect(beforeUpdate.endDate).toEqual(updatedProject.endDate);
    });

    it('should throw an exception with a non existing id', async () => {
      let error;
      try {
        await service.update(INVALID_ID, updateProjectDto);
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
      const beforeCount = mockProjectDatabase.length;
      await service.remove(0);
      expect(mockProjectDatabase.length).toEqual(beforeCount - 1);
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