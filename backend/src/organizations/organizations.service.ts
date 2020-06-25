import { Injectable } from '@nestjs/common';
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

  create(createOrganizationDto: OrganizationDto): Promise<Organization> {
    const organization = this.organizationsRepository.create(
      createOrganizationDto,
    );
    organization.encryptedPassword = OrganizationsService.encrypt(
      createOrganizationDto.password,
    );

    return this.organizationsRepository.save(organization);
  }

  async findAll(): Promise<Organization[]> {
    return this.organizationsRepository.find();
  }

  async findOne(id: number): Promise<Organization> {
    return this.organizationsRepository.findOne(id);
  }

  public async update(
    id: number,
    organization: OrganizationDto,
  ): Promise<Organization> {
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
