import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProjectDto } from './project.dto';
import { Project } from './project.entity';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly ProjectsService: ProjectsService) {}

  @Post()
  create(
    @Body() createProjectDto: ProjectDto,
  ): Promise<Project> {
    return this.ProjectsService.create(createProjectDto);
  }

  @Get()
  findAll(): Promise<Project[]> {
    return this.ProjectsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Project> {
    return this.ProjectsService.findOne(Number(id));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() project: ProjectDto) {
    return this.ProjectsService.update(Number(id), project);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.ProjectsService.remove(Number(id));
  }
}
