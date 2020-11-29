import { ProjectDto } from './project.dto';
import { Project } from './project.entity';
import { ProjectsService } from './projects.service';
import { User } from '../users/user.entity';
export declare class ProjectsController {
    private readonly projectsService;
    constructor(projectsService: ProjectsService);
    create(createProjectDto: ProjectDto): Promise<Project>;
    findAll(): Promise<Project[]>;
    findFeatured(): Promise<Project[]>;
    findOne(id: number): Promise<Project>;
    update(req: {
        user: User;
    }, id: number, newProjectInfo: ProjectDto): Promise<Project>;
    toggleLike(req: {
        user: User;
    }, id: number): Promise<Project>;
    remove(req: {
        user: User;
    }, id: number): Promise<void>;
}
