import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrganizationDto } from './organization.dto';
import { Organization } from './organization.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectRepository(Organization)
    private readonly organizationsRepository: Repository<Organization>,
    @Inject(UsersService)
    private readonly userService: UsersService,
  ) {}

  async create(organizationDto: OrganizationDto): Promise<Organization> {
    const sameEmailOrganizations = await this.organizationsRepository.find({
      email: organizationDto.email,
    });

    if (sameEmailOrganizations.length !== 0) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: 'Email already used',
        },
        HttpStatus.CONFLICT,
      );
    }

    const organization = await this.organizationsRepository.create(
      organizationDto,
    );

    if (organizationDto.adminUserId !== undefined) {
      organization.adminUser = await this.userService.findOne(
        organizationDto.adminUserId,
      );
    }

    return this.organizationsRepository.save(organization);
  }

  async findAll(): Promise<Organization[]> {
    return this.organizationsRepository.find();
  }

  async findOne(id: number): Promise<Organization> {
    const organization = await this.organizationsRepository.findOne(id, {
      relations: ['adminUser'],
    });
    if (organization === undefined) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Organization with id:${id} not found`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return organization;
  }

  async findByEmail(email: string): Promise<Organization> {
    const organizationsFound = await this.organizationsRepository.find({
      email,
    });

    if (organizationsFound.length === 0) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Organization with email:${email} not found`,
        },
        HttpStatus.NOT_FOUND,
      );
    } else {
      return await this.findOne(organizationsFound[0].id);
    }
  }

  public async update(
    id: number,
    organization: OrganizationDto,
  ): Promise<Organization> {
    await this.findOne(id); // checks if the organization exists
    await this.organizationsRepository.update(id, organization);

    return this.organizationsRepository.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id); // checks if the organization exists
    await this.organizationsRepository.delete(id);
  }
}
