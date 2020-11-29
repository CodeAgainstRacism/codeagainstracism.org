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
exports.ProjectsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const project_dto_1 = require("./project.dto");
const project_entity_1 = require("./project.entity");
const projects_service_1 = require("./projects.service");
let ProjectsController = class ProjectsController {
    constructor(projectsService) {
        this.projectsService = projectsService;
    }
    create(createProjectDto) {
        return this.projectsService.create(createProjectDto);
    }
    findAll() {
        return this.projectsService.findAll();
    }
    findFeatured() {
        return this.projectsService.findFeatured(true);
    }
    findOne(id) {
        return this.projectsService.findOne(id);
    }
    async update(req, id, newProjectInfo) {
        var _a, _b;
        const project = await this.projectsService.findOne(id);
        if (req['user'].id !== ((_b = (_a = project === null || project === void 0 ? void 0 : project.organization) === null || _a === void 0 ? void 0 : _a.adminUser) === null || _b === void 0 ? void 0 : _b.id)) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.FORBIDDEN,
                error: `Insufficient permissions. Only the project's owner can modify it`,
            }, common_1.HttpStatus.FORBIDDEN);
        }
        return this.projectsService.update(id, newProjectInfo);
    }
    toggleLike(req, id) {
        return this.projectsService.toggleLike(id, req.user);
    }
    async remove(req, id) {
        var _a, _b;
        const project = await this.projectsService.findOne(id);
        if (req['user'].id !== ((_b = (_a = project === null || project === void 0 ? void 0 : project.organization) === null || _a === void 0 ? void 0 : _a.adminUser) === null || _b === void 0 ? void 0 : _b.id)) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.FORBIDDEN,
                error: `Insufficient permissions. Only the project's owner can delete it`,
            }, common_1.HttpStatus.FORBIDDEN);
        }
        return this.projectsService.remove(id);
    }
};
__decorate([
    common_1.Post(),
    swagger_1.ApiOperation({ summary: 'Creates a project' }),
    swagger_1.ApiResponse({
        status: 201,
        description: 'Returns the created project',
        type: project_entity_1.Project,
    }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [project_dto_1.ProjectDto]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "create", null);
__decorate([
    common_1.Get(),
    swagger_1.ApiOperation({ summary: 'Fetches all projects' }),
    swagger_1.ApiResponse({
        status: 200,
        description: 'Returns an array of all the projects',
        type: [project_entity_1.Project],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "findAll", null);
__decorate([
    common_1.Get('/featured'),
    swagger_1.ApiOperation({ summary: 'Fetches all featured projects' }),
    swagger_1.ApiResponse({
        status: 200,
        description: 'Returns an array of all the featured projects',
        type: [project_entity_1.Project],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "findFeatured", null);
__decorate([
    common_1.Get(':id'),
    swagger_1.ApiOperation({ summary: 'Fetches a project' }),
    swagger_1.ApiResponse({
        status: 200,
        description: 'Return the project with the specified id',
        type: project_entity_1.Project,
    }),
    swagger_1.ApiResponse({
        status: 404,
        description: 'Error message saying that no project with the specified id has been found',
    }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "findOne", null);
__decorate([
    common_1.Put(':id'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiOperation({ summary: 'Updates a project' }),
    swagger_1.ApiResponse({
        status: 200,
        description: 'Returns the updated project',
        type: project_entity_1.Project,
    }),
    swagger_1.ApiResponse({
        status: 403,
        description: "Error message saying forbidden. Happens when a user tries to delete a project they don't own",
    }),
    swagger_1.ApiResponse({
        status: 404,
        description: 'Error message saying that no project with the specified id has been found',
    }),
    __param(0, common_1.Req()),
    __param(1, common_1.Param('id')),
    __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, project_dto_1.ProjectDto]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "update", null);
__decorate([
    common_1.Post(':id/toggle-like'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiOperation({ summary: 'Likes or unlikes a project' }),
    swagger_1.ApiResponse({
        status: 200,
        description: 'Returns the updated project',
        type: project_entity_1.Project,
    }),
    swagger_1.ApiResponse({
        status: 401,
        description: 'Unauthorized. When the JWT is not provided or invalid',
    }),
    swagger_1.ApiResponse({
        status: 404,
        description: 'Error message saying that no project with the specified id has been found',
    }),
    __param(0, common_1.Req()),
    __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "toggleLike", null);
__decorate([
    common_1.Delete(':id'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiOperation({ summary: 'Deletes a project' }),
    swagger_1.ApiResponse({
        status: 200,
        description: 'Deletion successful. Returns an empty response',
    }),
    swagger_1.ApiResponse({
        status: 403,
        description: "Forbidden: When a user tries to delete a project they don't own",
    }),
    swagger_1.ApiResponse({
        status: 404,
        description: 'Error message saying that no project with the specified id has been found',
    }),
    __param(0, common_1.Req()),
    __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "remove", null);
ProjectsController = __decorate([
    swagger_1.ApiTags('projects'),
    common_1.Controller('projects'),
    __metadata("design:paramtypes", [projects_service_1.ProjectsService])
], ProjectsController);
exports.ProjectsController = ProjectsController;
//# sourceMappingURL=projects.controller.js.map