import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { OrganizationDto } from './organization.dto';
import { Organization } from './organization.entity';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectRepository(Organization)
    private readonly organizationsRepository: Repository<Organization>,
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

    const organization = this.organizationsRepository.create(organizationDto);
    organization.encryptedPassword = OrganizationsService.encrypt(
      organizationDto.password,
    );

    return this.organizationsRepository.save(organization);
  }

  async findAll(): Promise<Organization[]> {
    return this.organizationsRepository.find();
  }

  async findOne(id: number): Promise<Organization> {
    const organization = await this.organizationsRepository.findOne(id, {
      relations: ['projects'],
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
    if (organization.password) {
      await this.organizationsRepository.update(id, {
        encryptedPassword: OrganizationsService.encrypt(organization.password),
      });
      delete organization.password;
    }
    await this.organizationsRepository.update(id, organization);

    return this.organizationsRepository.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id); // checks if the organization exists
    await this.organizationsRepository.delete(id);
  }

  /**
   * Returns the encrypted password using bcrypt
   * @param password password to encrypt
   */
  public static encrypt(password: string): string {
    return bcrypt.hashSync(password, 10);
  }
}
