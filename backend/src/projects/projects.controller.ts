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
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ProjectDto } from './project.dto';
import { Project } from './project.entity';
import { ProjectsService } from './projects.service';
import { User } from '../users/user.entity';

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
    description: 'An array of all the projects',
    type: [Project],
  })
  findAll(): Promise<Project[]> {
    return this.projectsService.findAll();
  }

  @Get('/featured')
  @ApiOperation({ summary: 'Fetches all featured projects' })
  @ApiResponse({
    status: 200,
    description: 'An array of all the featured projects',
    type: [Project],
  })
  findFeatured(): Promise<Project[]> {
    return this.projectsService.findFeatured(true);
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
  @ApiBearerAuth()
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
    @Req() req: { user: User },
    @Param('id') id: number,
    @Body() newProjectInfo: ProjectDto,
  ) {
    const project = await this.projectsService.findOne(id);

    if (req['user'].id !== project?.organization?.adminUser?.id) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: `Insufficient permissions. Only the project's owner can modify it`,
        },
        HttpStatus.FORBIDDEN,
      );
    }
    return this.projectsService.update(id, newProjectInfo);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
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
  async remove(
    @Req() req: { user: User },
    @Param('id') id: number,
  ): Promise<void> {
    const project = await this.projectsService.findOne(id);

    if (req['user'].id !== project?.organization?.adminUser?.id) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: `Insufficient permissions. Only the project's owner can delete it`,
        },
        HttpStatus.FORBIDDEN,
      );
    }

    return this.projectsService.remove(id);
  }
}
