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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const utils_1 = require("../utils/utils");
const user_entity_1 = require("./user.entity");
let UsersService = class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async create(userDto) {
        const sameEmailUser = await this.usersRepository.find({
            email: userDto.email,
        });
        if (sameEmailUser.length !== 0) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.CONFLICT,
                error: 'Email already used',
            }, common_1.HttpStatus.CONFLICT);
        }
        const user = this.usersRepository.create(userDto);
        user.encryptedPassword = utils_1.encryptPassword(userDto.password);
        return this.usersRepository.save(user);
    }
    findAll() {
        return this.usersRepository.find();
    }
    async findOne(id) {
        const user = await this.usersRepository.findOne(id, {
            relations: ['ownedOrganization', 'likedProjects'],
        });
        if (user === undefined) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                error: `User with id:${id} not found`,
            }, common_1.HttpStatus.NOT_FOUND);
        }
        return user;
    }
    async findByEmail(email) {
        const usersFound = await this.usersRepository.find({
            where: { email },
            select: ['id', 'firstName', 'lastName', 'email', 'encryptedPassword'],
        });
        if (usersFound.length === 0) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                error: `User with email:${email} not found`,
            }, common_1.HttpStatus.NOT_FOUND);
        }
        return usersFound[0];
    }
    async update(id, userDto) {
        await this.findOne(id);
        if (userDto.password) {
            await this.usersRepository.update(id, {
                encryptedPassword: utils_1.encryptPassword(userDto.password),
            });
            delete userDto.password;
        }
        await this.usersRepository.update(id, userDto);
        return this.usersRepository.findOne(id);
    }
    async remove(id) {
        await this.findOne(id);
        await this.usersRepository.delete(id);
    }
};
UsersService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map