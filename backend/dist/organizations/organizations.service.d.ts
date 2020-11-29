import { Repository } from 'typeorm';
import { OrganizationDto } from './organization.dto';
import { Organization } from './organization.entity';
import { UsersService } from '../users/users.service';
export declare class OrganizationsService {
    private readonly organizationsRepository;
    private readonly userService;
    constructor(organizationsRepository: Repository<Organization>, userService: UsersService);
    create(organizationDto: OrganizationDto): Promise<Organization>;
    findAll(): Promise<Organization[]>;
    findOne(id: number): Promise<Organization>;
    findByEmail(email: string): Promise<Organization>;
    update(id: number, organizationDto: OrganizationDto): Promise<Organization>;
    remove(id: number): Promise<void>;
}
