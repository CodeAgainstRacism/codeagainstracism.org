import { UserDto } from '../users/user.dto';
import { User } from '../users/user.entity';
import { encryptPassword } from '../utils/utils';

const mockUserEntities = [
  new User(0, 'John', 'Doe', 'johndoe@email.com', encryptPassword('password1')),
  new User(1, 'Jane', 'Doe', 'janedoe@email.com', encryptPassword('password2')),
];

const newUserDto: UserDto = {
  firstName: 'Steve',
  lastName: 'Jobs',
  phoneNumber: '+001 (012) 012-0123',
  email: 'stevejobs@email.com',
  password: 'imalive',
  description: '',
};

const updateUserDto: UserDto = {
  firstName: 'Bob',
  lastName: 'Gratton',
  phoneNumber: '+001 (012) 012-0123',
  email: 'bobgratton@email.com',
  password: 'rock&roll',
  description: '',
};

export { mockUserEntities, newUserDto, updateUserDto };
