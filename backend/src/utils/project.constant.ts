import { Project } from '../projects/project.entity';
import { ProjectDto } from '../projects/project.dto';
import { Organization } from '../organizations/organization.entity';
import { User } from '../users/user.entity';

const mockProjectEntities = [
  new Project(
    0,
    'Code Against Racism',
    'A cool project !',
    new Date('2020/06/15'),
    undefined,
    null,
  ),
  new Project(
    1,
    'spark',
    'A simple cli to input and store your ideas directly with git and without a text editor',
    new Date('2020/06/05'),
    new Date('2020/06/15'),
    false,
    new Organization(
      1,
      '34-5678901',
      'organization name 2',
      'organization description 2',
      '+002 (123) 456-7890',
      'janedoe@email.com',
      'Jane',
      'Doe',
      new User(1, 'John', 'Doe', 'johndoe@email.com'),
    ),
  ),
  new Project(
    2,
    'The iPhone',
    'Top secret new phone',
    new Date('2004/01/01'),
    new Date('2004/01/01'),
    null,
  ),
];

const newProjectDto: ProjectDto = {
  name: 'The iPhone',
  description: 'Top secret new phone',
  startDate: new Date('2004/01/01'),
  endDate: new Date('2004/01/01'),
  organizationId: null,
};

const updateProjectDto: ProjectDto = {
  name: 'A new name !',
  description: 'A new description',
  startDate: undefined,
  endDate: undefined,
  organizationId: null,
};

export { mockProjectEntities, newProjectDto, updateProjectDto };
