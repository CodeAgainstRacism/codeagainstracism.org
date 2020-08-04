import { Organization } from '../organizations/organization.entity';
import { OrganizationDto } from '../organizations/organization.dto';

const mockOrganizationEntities = [
  new Organization(
    0,
    '12-3456789',
    'organization name',
    'organization description',
    '+001 (012) 012-0123',
    'johndoe@email.com',
    'John',
    'Doe',
  ),
  new Organization(
    1,
    '34-5678901',
    'organization name 2',
    'organization description 2',
    '+002 (123) 456-7890',
    'janedoe@email.com',
    'Jane',
    'Doe',
  ),
];

const newOrganizationDto: OrganizationDto = {
  EIN: '12-3456789',
  name: 'Apple',
  description: 'The apple company',
  phoneNumber: '+001 (012) 012-0123',
  email: 'stevejobs@apple.com',
  password: 'strongpassword',
  contactFirstName: 'Steve',
  contactLastName: 'Jobs',
};

const updateOrganizationDtoWithPassword: OrganizationDto = {
  EIN: undefined,
  name: undefined,
  description: undefined,
  phoneNumber: undefined,
  email: undefined,
  password: 'new password',
  contactFirstName: 'Steve',
  contactLastName: 'Jobs',
};

const updateOrganizationDtoWithoutPassword: OrganizationDto = {
  EIN: undefined,
  name: 'new name',
  description: undefined,
  phoneNumber: undefined,
  email: 'newemail@email.com',
  password: undefined,
  contactFirstName: undefined,
  contactLastName: undefined,
};

export {
  mockOrganizationEntities,
  newOrganizationDto,
  updateOrganizationDtoWithoutPassword,
  updateOrganizationDtoWithPassword,
};
