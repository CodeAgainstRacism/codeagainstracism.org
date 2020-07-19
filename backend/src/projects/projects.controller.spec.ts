import { HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsController } from './projects.controller';
import { ProjectDto } from './project.dto';
import { ProjectsService } from './projects.service';
import { Project } from './project.entity';
import { Organization } from '../organizations/organization.entity';

const mockData = [
  new Project(
    0,
    'Code Against Racism',
    'A cool project !',
    new Date('2020/06/15'),
    undefined,
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
  ),
  new Project(
    1,
    'spark',
    'A simple cli to input and store your ideas directly with git and without a text editor',
    new Date('2020/06/05'),
    new Date('2020/06/15'),
    null,
  ),
];

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
                Promise.resolve({ id: 2, ...project }),
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

    mockDatabase = mockData.map(project => ({ ...project }));
    controller = module.get<ProjectsController>(ProjectsController);
    service = module.get<ProjectsService>(ProjectsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should get an array of projects', () => {
      expect(controller.findAll()).resolves.toEqual(mockDatabase);
    });
  });

  describe('findOne', () => {
    it('should get an project', () => {
      expect(controller.findOne(0)).resolves.toEqual(mockDatabase[0]);
      expect(controller.findOne(1)).resolves.toEqual(mockDatabase[1]);
    });
  });

  describe('create', () => {
    it('should create an project', () => {
      const newProject: ProjectDto = {
        name: 'The iPhone',
        description: 'Top secret new phone',
        startDate: new Date('2004/01/01'),
        endDate: new Date('2007/06/29'),
        organizationId: null,
      };
      const beforeCount = mockDatabase.length;
      expect(controller.create(newProject)).resolves.toEqual({
        id: beforeCount,
        ...newProject,
      });
    });
  });

  describe('update', () => {
    it('should update an project', async () => {
      const newData: ProjectDto = {
        name: 'A new name !',
        description: 'A new description',
        startDate: undefined,
        endDate: undefined,
        organizationId: null,
      };

      const beforeUpdate = mockDatabase[0];
      const updatedProject = await controller.update(
        { user: mockDatabase[0].organization },
        0,
        newData,
      );
      expect(beforeUpdate.id).toEqual(updatedProject.id);
      expect(newData.name).toEqual(updatedProject.name);
      expect(newData.description).toEqual(updatedProject.description);
      expect(beforeUpdate.startDate).toEqual(updatedProject.startDate);
      expect(beforeUpdate.endDate).toEqual(updatedProject.endDate);
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
            error: `Unsuffisiant permissions. Only the project's owner can delete it`,
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
      await controller.remove({ user: mockDatabase[0].organization }, 0);
      expect(mockDatabase.length).toEqual(beforeCount - 1);
    });

    it('should not delete an project due to missing permissions', async () => {
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
            error: `Unsuffisiant permissions. Only the project's owner can delete it`,
          },
          HttpStatus.FORBIDDEN,
        ),
      );
      expect(mockDatabase.length).toEqual(beforeCount);
    });
  });
});
