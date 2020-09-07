import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectDto } from './project.dto';
import { Project } from './project.entity';
import { OrganizationsService } from '../organizations/organizations.service';
import { User } from '../users/user.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectsRepository: Repository<Project>,
    @Inject(OrganizationsService)
    private readonly organizationsService: OrganizationsService,
  ) {}

  async create(projectDto: ProjectDto): Promise<Project> {
    const project = await this.projectsRepository.create(projectDto);

    if (projectDto.organizationId !== undefined) {
      project.organization = await this.organizationsService.findOne(
        projectDto.organizationId,
      );
    }

    return this.projectsRepository.save(project);
  }

  findAll(): Promise<Project[]> {
    return this.projectsRepository.find();
  }

  async findOne(id: number): Promise<Project> {
    const project = await this.projectsRepository.findOne(id, {
      relations: ['likers'],
    });

    if (project === undefined) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Project with id:${id} not found`,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return project;
  }

  async findFeatured(isFeatured: boolean): Promise<Project[]> {
    const projects = await this.projectsRepository.find({
      where: { isFeatured },
      select: [
        'id',
        'description',
        'startDate',
        'endDate',
        'isFeatured',
        'isCompleted',
        'organization',
        'createdAt',
        'updatedAt',
      ],
    });

    if (projects === undefined) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `No featured projects found`,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return projects;
  }

  public async update(id: number, project: ProjectDto): Promise<Project> {
    await this.findOne(id); // checks if the project exists
    await this.projectsRepository.update(id, project);
    return this.projectsRepository.findOne(id);
  }

  async toggleLike(id: number, user: User): Promise<Project> {
    const project = await this.findOne(id);

    // update the likers array
    const likerIndex = project.likers.findIndex(liker => liker.id === user.id);
    if (likerIndex > -1) {
      project.likers.splice(likerIndex, 1);
    } else {
      project.likers.push(user);
    }

    // update the like count
    project.likeCount = project.likers.length;

    return this.projectsRepository.save(project);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id); // checks if the project exists
    await this.projectsRepository.delete(id);
  }
}
