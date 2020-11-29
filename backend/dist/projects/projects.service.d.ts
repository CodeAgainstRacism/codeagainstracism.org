import { Repository } from 'typeorm';
import { ProjectDto } from './project.dto';
import { Project } from './project.entity';
import { OrganizationsService } from '../organizations/organizations.service';
import { User } from '../users/user.entity';
export declare class ProjectsService {
    private readonly projectsRepository;
    private readonly organizationsService;
    constructor(projectsRepository: Repository<Project>, organizationsService: OrganizationsService);
    create(projectDto: ProjectDto): Promise<Project>;
    findAll(): Promise<Project[]>;
    findOne(id: number): Promise<Project>;
    findFeatured(isFeatured: boolean): Promise<Project[]>;
    update(id: number, project: ProjectDto): Promise<Project>;
    toggleLike(id: number, user: User): Promise<Project>;
    remove(id: number): Promise<void>;
}
