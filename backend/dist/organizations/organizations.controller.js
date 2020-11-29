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
exports.OrganizationsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const organization_dto_1 = require("./organization.dto");
const organization_entity_1 = require("./organization.entity");
const organizations_service_1 = require("./organizations.service");
let OrganizationsController = class OrganizationsController {
    constructor(organizationsService) {
        this.organizationsService = organizationsService;
    }
    create(createOrganizationDto) {
        return this.organizationsService.create(createOrganizationDto);
    }
    findAll() {
        return this.organizationsService.findAll();
    }
    findOne(id) {
        return this.organizationsService.findOne(Number(id));
    }
    update(id, organization) {
        return this.organizationsService.update(Number(id), organization);
    }
    remove(id) {
        return this.organizationsService.remove(Number(id));
    }
};
__decorate([
    common_1.Post(),
    swagger_1.ApiOperation({ summary: 'Creates an organization' }),
    swagger_1.ApiResponse({
        status: 201,
        description: 'Returns the created organization',
        type: organization_entity_1.Organization,
    }),
    swagger_1.ApiResponse({
        status: 409,
        description: 'Error message saying that the email is already used',
    }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [organization_dto_1.OrganizationDto]),
    __metadata("design:returntype", Promise)
], OrganizationsController.prototype, "create", null);
__decorate([
    common_1.Get(),
    swagger_1.ApiOperation({ summary: 'Fetches all organizations' }),
    swagger_1.ApiResponse({
        status: 200,
        description: 'Returns an array of all the organizations',
        type: [organization_entity_1.Organization],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrganizationsController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    swagger_1.ApiOperation({ summary: 'Fetches an organization' }),
    swagger_1.ApiResponse({
        status: 200,
        description: 'Return the organization with the specified id',
        type: organization_entity_1.Organization,
    }),
    swagger_1.ApiResponse({
        status: 404,
        description: 'Error message saying that no organization with the specified id has been found',
    }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrganizationsController.prototype, "findOne", null);
__decorate([
    common_1.Put(':id'),
    swagger_1.ApiOperation({ summary: 'Updates an organization' }),
    swagger_1.ApiResponse({
        status: 200,
        description: 'Returns the updated organization',
        type: organization_entity_1.Organization,
    }),
    swagger_1.ApiResponse({
        status: 404,
        description: 'Error message saying that no organization with the specified id has been found',
    }),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, organization_dto_1.OrganizationDto]),
    __metadata("design:returntype", void 0)
], OrganizationsController.prototype, "update", null);
__decorate([
    common_1.Delete(':id'),
    swagger_1.ApiOperation({ summary: 'Deletes an organization' }),
    swagger_1.ApiResponse({
        status: 200,
        description: 'Deletion successful. Returns an empty response',
    }),
    swagger_1.ApiResponse({
        status: 404,
        description: 'Error message saying that no organization with the specified id has been found',
    }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrganizationsController.prototype, "remove", null);
OrganizationsController = __decorate([
    swagger_1.ApiTags('organizations'),
    common_1.Controller('organizations'),
    __metadata("design:paramtypes", [organizations_service_1.OrganizationsService])
], OrganizationsController);
exports.OrganizationsController = OrganizationsController;
//# sourceMappingURL=organizations.controller.js.map