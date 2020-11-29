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
exports.OrganizationsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const organization_entity_1 = require("./organization.entity");
const users_service_1 = require("../users/users.service");
let OrganizationsService = class OrganizationsService {
    constructor(organizationsRepository, userService) {
        this.organizationsRepository = organizationsRepository;
        this.userService = userService;
    }
    async create(organizationDto) {
        const sameEmailOrganizations = await this.organizationsRepository.find({
            email: organizationDto.email,
        });
        if (sameEmailOrganizations.length !== 0) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.CONFLICT,
                error: 'Email already used',
            }, common_1.HttpStatus.CONFLICT);
        }
        const organization = await this.organizationsRepository.create(organizationDto);
        if (organizationDto.adminUserId !== undefined) {
            organization.adminUser = await this.userService.findOne(organizationDto.adminUserId);
        }
        return this.organizationsRepository.save(organization);
    }
    async findAll() {
        return this.organizationsRepository.find();
    }
    async findOne(id) {
        const organization = await this.organizationsRepository.findOne(id, {
            relations: ['adminUser', 'projects'],
        });
        if (organization === undefined) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                error: `Organization with id:${id} not found`,
            }, common_1.HttpStatus.NOT_FOUND);
        }
        return organization;
    }
    async findByEmail(email) {
        const organizationsFound = await this.organizationsRepository.find({
            email,
        });
        if (organizationsFound.length === 0) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                error: `Organization with email:${email} not found`,
            }, common_1.HttpStatus.NOT_FOUND);
        }
        else {
            return await this.findOne(organizationsFound[0].id);
        }
    }
    async update(id, organizationDto) {
        const organization = await this.findOne(id);
        if (organizationDto.adminUserId) {
            const user = await this.userService.findOne(organizationDto.adminUserId);
            delete organizationDto.adminUserId;
            organization.adminUser = user;
        }
        Object.assign(organization, organizationDto);
        return this.organizationsRepository.save(organization);
    }
    async remove(id) {
        const organization = await this.findOne(id);
        organization.adminUser = null;
        await this.organizationsRepository.save(organization);
        await this.organizationsRepository.delete(id);
    }
};
OrganizationsService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(organization_entity_1.Organization)),
    __param(1, common_1.Inject(users_service_1.UsersService)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService])
], OrganizationsService);
exports.OrganizationsService = OrganizationsService;
//# sourceMappingURL=organizations.service.js.map