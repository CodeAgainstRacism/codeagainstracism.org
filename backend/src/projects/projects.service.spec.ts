import { HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectsService } from './projects.service';
import { Project } from './project.entity';
import { ProjectDto } from './project.dto';

const INVALID_ID = -1;

const mockData = [
  new Project(
    0,
    'Code Against Racism',
    'A cool project !',
    new Date('2020/06/15'),
    undefined,
  ),
  new Project(
    1,
    'spark',
    'A simple cli to input and store your ideas directly with git and without a text editor',
    new Date('2020/06/05'),
    new Date('2020/06/15'),
  ),
];

let mockDatabase: Project[] = [];

describe('ProjectsService', () => {
  let service: ProjectsService;
  let repo: Repository<Project>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectsService,
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
  });

  describe('update', () => {
    it('should update a project without password', async () => {
      const newData: ProjectDto = {
        name: 'A new name !',
        description: 'A new description',
        startDate: undefined,
        endDate: undefined,
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
