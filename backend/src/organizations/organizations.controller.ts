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
  @ApiResponse({
    status: 201,
    description: 'Returns the created organization',
    type: Organization,
  })
  @ApiResponse({
    status: 409,
    description: 'Error message saying that the email is already used',
  })
  create(
    @Body() createOrganizationDto: OrganizationDto,
  ): Promise<Organization> {
    return this.organizationsService.create(createOrganizationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Fetches all organizations' })
  @ApiResponse({
    status: 200,
    description: 'Returns an array of all the organizations',
    type: [Organization],
  })
  findAll(): Promise<Organization[]> {
    return this.organizationsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Fetches an organization' })
  @ApiResponse({
    status: 200,
    description: 'Return the organization with the specified id',
    type: Organization,
  })
  @ApiResponse({
    status: 404,
    description:
      'Error message saying that no organization with the specified id has been found',
  })
  findOne(@Param('id') id: string): Promise<Organization> {
    return this.organizationsService.findOne(Number(id));
  }

  @Put(':id')
  @ApiOperation({ summary: 'Updates an organization' })
  @ApiResponse({
    status: 200,
    description: 'Returns the updated organization',
    type: Organization,
  })
  @ApiResponse({
    status: 404,
    description:
      'Error message saying that no organization with the specified id has been found',
  })
  update(@Param('id') id: string, @Body() organization: OrganizationDto) {
    return this.organizationsService.update(Number(id), organization);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletes an organization' })
  @ApiResponse({
    status: 200,
    description: 'Deletion successful. Returns an empty response',
  })
  @ApiResponse({
    status: 404,
    description:
      'Error message saying that no organization with the specified id has been found',
  })
  remove(@Param('id') id: string): Promise<void> {
    return this.organizationsService.remove(Number(id));
  }
}
