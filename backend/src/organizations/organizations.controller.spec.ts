import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { OrganizationsController } from './organizations.controller';
import { OrganizationsService } from './organizations.service';
import { Organization } from './organization.entity';

describe('Organizations Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [OrganizationsController],
      providers: [
        OrganizationsService,
        {
          provide: getRepositoryToken(Organization),
          useValue: {},
        },
      ],
    }).compile();
  });
  
  it('should be defined', () => {
    const controller: OrganizationsController = module.get<
      OrganizationsController
    >(OrganizationsController);
    expect(controller).toBeDefined();
  });
});
