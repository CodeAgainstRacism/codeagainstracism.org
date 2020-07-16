import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
  ClassSerializerInterceptor,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrganizationDto } from './organization.dto';
import { Organization } from './organization.entity';
import { OrganizationsService } from './organizations.service';
import { ProjectsService } from '../projects/projects.service';
import { Project } from '../projects/project.entity';

@ApiTags('organizations')
@Controller('organizations')
@UseInterceptors(ClassSerializerInterceptor)
export class OrganizationsController {
  constructor(
    private readonly OrganizationsService: OrganizationsService,
    @Inject(forwardRef(() => ProjectsService))
    private readonly projectsService: ProjectsService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Creates an organization' })
  @ApiResponse({ status: 201 })
  @ApiResponse({ status: 409, description: 'Email already used' })
  create(
    @Body() createOrganizationDto: OrganizationDto,
  ): Promise<Organization> {
    return this.OrganizationsService.create(createOrganizationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Fetches all organizations' })
  @ApiResponse({
    status: 200,
    description: 'An array of with the organizations',
  })
  findAll(): Promise<Organization[]> {
    return this.OrganizationsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Fetches an organization' })
  @ApiResponse({
    status: 200,
    description: 'The found organization',
    type: Organization,
  })
  @ApiResponse({ status: 200 })
  @ApiResponse({
    status: 404,
    description: 'Organization with id:${id} not found',
  })
  findOne(@Param('id') id: string): Promise<Organization> {
    return this.OrganizationsService.findOne(Number(id));
  }

  @Get(':id/projects')
  @ApiOperation({ summary: "Fetches an organization's projects" })
  @ApiResponse({
    status: 200,
    description: "The organization's projects",
    type: Organization,
  })
  @ApiResponse({
    status: 404,
    description: 'Organization with id:${id} not found',
  })
  async findProjects(@Param('id') id: string): Promise<Project[]> {
    const organization = await this.OrganizationsService.findOne(Number(id));
    const projects = await this.projectsService.findAll();
    return projects.filter(
      project => project.organization?.id === organization.id,
    );
  }

  @Put(':id')
  @ApiOperation({ summary: 'Updates an organization' })
  @ApiResponse({ status: 200 })
  @ApiResponse({
    status: 404,
    description: 'Organization with id:${id} not found',
  })
  update(@Param('id') id: string, @Body() organization: OrganizationDto) {
    return this.OrganizationsService.update(Number(id), organization);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletes an organization' })
  @ApiResponse({ status: 200 })
  @ApiResponse({
    status: 404,
    description: 'Organization with id:${id} not found',
  })
  remove(@Param('id') id: string): Promise<void> {
    return this.OrganizationsService.remove(Number(id));
  }
}
