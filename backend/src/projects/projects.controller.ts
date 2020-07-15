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
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ProjectDto } from './project.dto';
import { Project } from './project.entity';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  create(@Body() createProjectDto: ProjectDto): Promise<Project> {
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  findAll(): Promise<Project[]> {
    return this.projectsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Project> {
    return this.projectsService.findOne(Number(id));
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() newProjectInfo: ProjectDto,
  ) {
    const project = await this.projectsService.findOne(Number(id));

    if (
      project.organization === null ||
      req['user'].id != project.organization.id
    ) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: `Unsuffisiant permissions. Only the project's owner can modify it`,
        },
        HttpStatus.FORBIDDEN,
      );
    }
    return this.projectsService.update(Number(id), newProjectInfo);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Req() req: Request, @Param('id') id: string): Promise<void> {
    const project = await this.projectsService.findOne(Number(id));

    if (
      project.organization === null ||
      req['user'].id != project.organization.id
    ) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: `Unsuffisiant permissions. Only the project's owner can delete it`,
        },
        HttpStatus.FORBIDDEN,
      );
    }

    return this.projectsService.remove(Number(id));
  }
}
