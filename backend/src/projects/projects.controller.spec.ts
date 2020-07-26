import { HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsController } from './projects.controller';
import { ProjectDto } from './project.dto';
import { ProjectsService } from './projects.service';
import { Project } from './project.entity';
import { Organization } from '../organizations/organization.entity';

import {
  mockProjectEntities,
  newProjectDto,
  updateProjectDto,
} from '../utils/project.constant';

let mockDatabase: Project[] = [];

describe('Project Controller', () => {
  let controller: ProjectsController;
  let service: ProjectsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectsController],

      providers: [
        {
          provide: ProjectsService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(mockDatabase),

            findOne: jest
              .fn()
              .mockImplementation((id: number) =>
                Promise.resolve(
                  mockDatabase.find(project => project.id === id),
                ),
              ),

            create: jest
              .fn()
              .mockImplementation((project: ProjectDto) =>
                Promise.resolve({ id: mockDatabase.length, ...project }),
              ),

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
                return Promise.resolve({ id: id, ...projectToUpdate });
              }),

            remove: jest.fn().mockImplementation((id: number) => {
              mockDatabase = mockDatabase.filter(project => project.id !== id);
              return Promise.resolve();
            }),
          },
        },
      ],
    }).compile();

    mockDatabase = mockProjectEntities.map(project => ({ ...project }));
    controller = module.get<ProjectsController>(ProjectsController);
    service = module.get<ProjectsService>(ProjectsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should get an array of projects', () => {
      controller.findAll().then(data => {
        expect(data).toEqual(mockDatabase);
      });
    });
  });

  describe('findOne', () => {
    it('should get an project', () => {
      controller.findOne(0).then(data => {
        expect(data).toEqual(mockDatabase[0]);
      });
      controller.findOne(1).then(data => {
        expect(data).toEqual(mockDatabase[1]);
      });
    });
  });

  describe('create', () => {
    it('should create an project', () => {
      const beforeCount = mockDatabase.length;
      controller.create({ ...newProjectDto }).then(data => {
        expect(data).toEqual({
          id: beforeCount,
          ...newProjectDto,
        });
      });
    });
  });

  describe('update', () => {
    it('should update an project', () => {
      const beforeUpdate = mockDatabase[1];
      controller
        .update({ user: mockDatabase[1].organization }, 1, {
          ...updateProjectDto,
        })
        .then(updatedProject => {
          expect(beforeUpdate.id).toEqual(updatedProject.id);
          expect(updateProjectDto.name).toEqual(updatedProject.name);
          expect(updateProjectDto.description).toEqual(
            updatedProject.description,
          );
          expect(beforeUpdate.startDate).toEqual(updatedProject.startDate);
          expect(beforeUpdate.endDate).toEqual(updatedProject.endDate);
        });
    });

    it('should throw a forbidden http exception and not update the project', async () => {
      const newData: ProjectDto = {
        name: 'A new name !',
        description: 'A new description',
        startDate: undefined,
        endDate: undefined,
        organizationId: null,
      };

      const beforeUpdate = mockDatabase[0];
      let error;
      try {
        await controller.update({ user: new Organization(-1) }, 0, newData);
      } catch (e) {
        error = e;
      }

      expect(error).toEqual(
        new HttpException(
          {
            status: HttpStatus.FORBIDDEN,
            error: `Insufficient permissions. Only the project's owner can delete it`,
          },
          HttpStatus.FORBIDDEN,
        ),
      );

      expect(beforeUpdate.id).toEqual(mockDatabase[0].id);
      expect(beforeUpdate.name).toEqual(mockDatabase[0].name);
      expect(beforeUpdate.description).toEqual(mockDatabase[0].description);
      expect(beforeUpdate.startDate).toEqual(mockDatabase[0].startDate);
      expect(beforeUpdate.endDate).toEqual(mockDatabase[0].endDate);
      expect(beforeUpdate.organization).toEqual(mockDatabase[0].organization);
    });
  });

  describe('delete', () => {
    it('should delete an project', async () => {
      const beforeCount = mockDatabase.length;
      await controller.remove({ user: mockDatabase[1].organization }, 1);
      expect(mockDatabase.length).toEqual(beforeCount - 1);
    });

    it('should not delete a project due to missing permissions', async () => {
      const beforeCount = mockDatabase.length;
      let error;
      try {
        await controller.remove({ user: null }, 0);
      } catch (e) {
        error = e;
      }

      expect(error).toEqual(
        new HttpException(
          {
            status: HttpStatus.FORBIDDEN,
            error: `Insufficient permissions. Only the project's owner can delete it`,
          },
          HttpStatus.FORBIDDEN,
        ),
      );
      expect(mockDatabase.length).toEqual(beforeCount);
    });
  });
});
