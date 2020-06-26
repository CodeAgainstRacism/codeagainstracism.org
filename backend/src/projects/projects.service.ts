import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectDto } from './project.dto';
import { Project } from './project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectsRepository: Repository<Project>,
  ) {}

  create(projectDto: ProjectDto): Promise<Project> {
    const project = this.projectsRepository.create(projectDto);
    return this.projectsRepository.save(project);
  }

  findAll(): Promise<Project[]> {
    return this.projectsRepository.find();
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
