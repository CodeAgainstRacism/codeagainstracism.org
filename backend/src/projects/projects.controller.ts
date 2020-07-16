import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  Request,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ProjectDto } from './project.dto';
import { Project } from './project.entity';
import { ProjectsService } from './projects.service';

@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @ApiOperation({ summary: 'Creates a project' })
  @ApiResponse({ status: 201 })
  create(@Body() createProjectDto: ProjectDto): Promise<Project> {
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  @ApiOperation({ summary: 'Fetches all projects' })
  @ApiResponse({
    status: 200,
    description: 'An array of with the projects',
    type: [Project],
  })
  findAll(): Promise<Project[]> {
    return this.projectsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Fetches a project' })
  @ApiResponse({
    status: 200,
    description: 'The found project',
    type: Project,
  })
  @ApiResponse({ status: 200 })
  @ApiResponse({
    status: 404,
    description: 'Project with id:${id} not found',
  })
  findOne(@Param('id') id: number): Promise<Project> {
    return this.projectsService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Updates a project' })
  @ApiResponse({ status: 200 })
  @ApiResponse({
    status: 403,
    description:
      "Forbidden: When an organization tries to delete a project they don't own",
  })
  @ApiResponse({
    status: 404,
    description: 'Project with id:${id} not found',
  })
  async update(
    @Req() req: Request,
    @Param('id') id: number,
    @Body() newProjectInfo: ProjectDto,
  ) {
    const project = await this.projectsService.findOne(id);

    if (
      project.organization === null ||
      req['user'].id !== project.organization.id
    ) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: `Unsuffisiant permissions. Only the project's owner can modify it`,
        },
        HttpStatus.FORBIDDEN,
      );
    }
    return this.projectsService.update(id, newProjectInfo);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Deletes a project' })
  @ApiResponse({ status: 200 })
  @ApiResponse({
    status: 403,
    description:
      "Forbidden: When an organization tries to delete a project they don't own",
  })
  @ApiResponse({
    status: 404,
    description: 'Project with id:${id} not found',
  })
  async remove(@Req() req: Request, @Param('id') id: number): Promise<void> {
    const project = await this.projectsService.findOne(id);

    if (
      project.organization === null ||
      req['user'].id !== project.organization.id
    ) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: `Unsuffisiant permissions. Only the project's owner can delete it`,
        },
        HttpStatus.FORBIDDEN,
      );
    }

    return this.projectsService.remove(id);
  }
}
