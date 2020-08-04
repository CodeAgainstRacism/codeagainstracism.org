import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectDto } from './project.dto';
import { Project } from './project.entity';
import { OrganizationsService } from '../organizations/organizations.service';

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

  async findAll(): Promise<Project[]> {
    const projects = await this.projectsRepository.find();

    projects.forEach(function(project) {
      // removes the password on the response
      if (project.organization) {
        delete project.organization.encryptedPassword;
      }
    });

    return projects;
  }

  async findOne(id: number): Promise<Project> {
    const project = await this.projectsRepository.findOne(id);

    if (project === undefined) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Project with id:${id} not found`,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    if (project.organization) {
      delete project.organization.encryptedPassword;
    }

    return project;
  }

  public async update(id: number, project: ProjectDto): Promise<Project> {
    await this.findOne(id); // checks if the project exists
    await this.projectsRepository.update(id, project);
    return this.projectsRepository.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id); // checks if the project exists
    await this.projectsRepository.delete(id);
  }
}