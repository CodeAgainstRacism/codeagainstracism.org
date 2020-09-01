import { Organization } from '../organizations/organization.entity';
import { OrganizationDto } from '../organizations/organization.dto';
import { User } from '../users/user.entity';

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
    new User(1, 'John', 'Doe', 'johndoe@email.com'),
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
    new User(2, 'Jane', 'Doe', 'janedoe@email.com'),
  ),
];

const newOrganizationDto: OrganizationDto = {
  EIN: '12-3456789',
  name: 'Apple',
  description: 'The apple company',
  phoneNumber: '+001 (012) 012-0123',
  email: 'stevejobs@apple.com',
  contactFirstName: 'Steve',
  contactLastName: 'Jobs',
  adminUserId: 1,
};

const updateOrganizationDto: OrganizationDto = {
  EIN: '00-0000000',
  name: 'new name',
  description: 'new description',
  phoneNumber: '+001 (000) 000-0000',
  email: 'newemail@email.com',
  contactFirstName: 'Steve',
  contactLastName: 'Jobs',
  adminUserId: 1,
};

export { mockOrganizationEntities, newOrganizationDto, updateOrganizationDto };
