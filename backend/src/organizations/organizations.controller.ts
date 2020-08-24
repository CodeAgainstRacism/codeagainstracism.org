import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrganizationDto } from './organization.dto';
import { Organization } from './organization.entity';
import { OrganizationsService } from './organizations.service';

@ApiTags('organizations')
@Controller('organizations')
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Post()
  @ApiOperation({ summary: 'Creates an organization' })
  @ApiResponse({ status: 201 })
  @ApiResponse({ status: 409, description: 'Email already used' })
  create(
    @Body() createOrganizationDto: OrganizationDto,
  ): Promise<Organization> {
    return this.organizationsService.create(createOrganizationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Fetches all organizations' })
  @ApiResponse({
    status: 200,
    description: 'An array of all the organizations',
  })
  findAll(): Promise<Organization[]> {
    return this.organizationsService.findAll();
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
    return this.organizationsService.findOne(Number(id));
  }

  @Put(':id')
  @ApiOperation({ summary: 'Updates an organization' })
  @ApiResponse({ status: 200 })
  @ApiResponse({
    status: 404,
    description: 'Organization with id:${id} not found',
  })
  update(@Param('id') id: string, @Body() organization: OrganizationDto) {
    return this.organizationsService.update(Number(id), organization);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletes an organization' })
  @ApiResponse({ status: 200 })
  @ApiResponse({
    status: 404,
    description: 'Organization with id:${id} not found',
  })
  remove(@Param('id') id: string): Promise<void> {
    return this.organizationsService.remove(Number(id));
  }
}
