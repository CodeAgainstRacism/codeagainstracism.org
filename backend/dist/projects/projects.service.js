"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const project_entity_1 = require("./project.entity");
const organizations_service_1 = require("../organizations/organizations.service");
let ProjectsService = class ProjectsService {
    constructor(projectsRepository, organizationsService) {
        this.projectsRepository = projectsRepository;
        this.organizationsService = organizationsService;
    }
    async create(projectDto) {
        const project = await this.projectsRepository.create(projectDto);
        if (projectDto.organizationId !== undefined) {
            project.organization = await this.organizationsService.findOne(projectDto.organizationId);
        }
        return this.projectsRepository.save(project);
    }
    findAll() {
        return this.projectsRepository.find();
    }
    async findOne(id) {
        const project = await this.projectsRepository.findOne(id, {
            relations: ['likers'],
        });
        if (project === undefined) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                error: `Project with id:${id} not found`,
            }, common_1.HttpStatus.NOT_FOUND);
        }
        return project;
    }
    async findFeatured(isFeatured) {
        const projects = await this.projectsRepository.find({
            where: { isFeatured },
            select: [
                'id',
                'description',
                'startDate',
                'endDate',
                'isFeatured',
                'isCompleted',
                'organization',
                'createdAt',
                'updatedAt',
            ],
        });
        if (projects === undefined) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                error: `No featured projects found`,
            }, common_1.HttpStatus.NOT_FOUND);
        }
        return projects;
    }
    async update(id, project) {
        await this.findOne(id);
        await this.projectsRepository.update(id, project);
        return this.projectsRepository.findOne(id);
    }
    async toggleLike(id, user) {
        const project = await this.findOne(id);
        const likerIndex = project.likers.findIndex(liker => liker.id === user.id);
        if (likerIndex > -1) {
            project.likers.splice(likerIndex, 1);
        }
        else {
            project.likers.push(user);
        }
        project.likeCount = project.likers.length;
        return this.projectsRepository.save(project);
    }
    async remove(id) {
        await this.findOne(id);
        await this.projectsRepository.delete(id);
    }
};
ProjectsService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(project_entity_1.Project)),
    __param(1, common_1.Inject(organizations_service_1.OrganizationsService)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        organizations_service_1.OrganizationsService])
], ProjectsService);
exports.ProjectsService = ProjectsService;
//# sourceMappingURL=projects.service.js.map