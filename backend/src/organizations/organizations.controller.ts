import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { OrganizationDto } from './organization.dto';
import { Organization } from './organization.entity';
import { OrganizationsService } from './organizations.service';

@Controller('organizations')
export class OrganizationsController {
  constructor(private readonly OrganizationsService: OrganizationsService) {}

  @Post()
  create(
    @Body() createOrganizationDto: OrganizationDto,
  ): Promise<Organization> {
    return this.OrganizationsService.create(createOrganizationDto);
  }

  @Get()
  findAll(): Promise<Organization[]> {
    return this.OrganizationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Organization> {
    return this.OrganizationsService.findOne(Number(id));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() organization: OrganizationDto) {
    return this.OrganizationsService.update(Number(id), organization);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.OrganizationsService.remove(Number(id));
  }
}
