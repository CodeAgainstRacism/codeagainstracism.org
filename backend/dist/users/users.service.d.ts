import { Repository } from 'typeorm';
import { UserDto } from './user.dto';
import { User } from './user.entity';
export declare class UsersService {
    private readonly usersRepository;
    constructor(usersRepository: Repository<User>);
    create(userDto: UserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    findByEmail(email: string): Promise<User>;
    update(id: number, userDto: UserDto): Promise<User>;
    remove(id: number): Promise<void>;
}
