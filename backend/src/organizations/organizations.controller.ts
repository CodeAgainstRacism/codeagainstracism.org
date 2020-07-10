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
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrganizationDto } from './organization.dto';
import { Organization } from './organization.entity';
import { OrganizationsService } from './organizations.service';

@ApiTags('organizations')
@Controller('organizations')
@UseInterceptors(ClassSerializerInterceptor)
export class OrganizationsController {
  constructor(private readonly OrganizationsService: OrganizationsService) {}

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
