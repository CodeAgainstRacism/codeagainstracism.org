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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Project = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const organization_entity_1 = require("../organizations/organization.entity");
const user_entity_1 = require("../users/user.entity");
let Project = class Project {
    constructor(id, name, description, startDate, endDate, imageURL, isFeatured, isCompleted, organization, likers) {
        var _a;
        this.id = id;
        this.name = name;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.imageURL = imageURL;
        this.isFeatured = isFeatured;
        this.isCompleted = isCompleted;
        this.organization = organization;
        this.likers = likers;
        this.likeCount = (_a = likers === null || likers === void 0 ? void 0 : likers.length) !== null && _a !== void 0 ? _a : 0;
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    swagger_1.ApiProperty({ example: 6 }),
    __metadata("design:type", Number)
], Project.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    swagger_1.ApiProperty({ example: 'Code Against Racism' }),
    __metadata("design:type", String)
], Project.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ length: '1023' }),
    swagger_1.ApiProperty({ example: 'A cool project !' }),
    __metadata("design:type", String)
], Project.prototype, "description", void 0);
__decorate([
    typeorm_1.Column(),
    swagger_1.ApiProperty({ example: new Date('2020/06/23') }),
    __metadata("design:type", Date)
], Project.prototype, "startDate", void 0);
__decorate([
    typeorm_1.Column({ default: null }),
    swagger_1.ApiProperty({ example: new Date('2038/01/19') }),
    __metadata("design:type", Date)
], Project.prototype, "endDate", void 0);
__decorate([
    typeorm_1.Column({ default: false }),
    swagger_1.ApiProperty({ example: true }),
    __metadata("design:type", Boolean)
], Project.prototype, "isFeatured", void 0);
__decorate([
    typeorm_1.Column({ default: false }),
    swagger_1.ApiProperty({ example: false }),
    __metadata("design:type", Boolean)
], Project.prototype, "isCompleted", void 0);
__decorate([
    typeorm_1.Column({ default: null }),
    swagger_1.ApiProperty({ example: 'React.ts, apollo server(graphql), typeorm, any headless cms' }),
    __metadata("design:type", String)
], Project.prototype, "qualificationsNeeded", void 0);
__decorate([
    typeorm_1.Column(),
    typeorm_1.CreateDateColumn(),
    swagger_1.ApiProperty({ example: new Date('2020-07-10T13:08:16.364Z') }),
    __metadata("design:type", Date)
], Project.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Column(),
    typeorm_1.UpdateDateColumn(),
    swagger_1.ApiProperty({ example: new Date('2020-07-15T22:50:43.000Z') }),
    __metadata("design:type", Date)
], Project.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.Column({ default: null }),
    swagger_1.ApiProperty({ example: 'https://i.imgur.com/TTFCXdv.png' }),
    __metadata("design:type", String)
], Project.prototype, "imageURL", void 0);
__decorate([
    typeorm_1.ManyToOne(() => organization_entity_1.Organization, (organization) => organization.projects, { eager: true, onDelete: 'CASCADE' }),
    swagger_1.ApiProperty({
        example: organization_entity_1.Organization,
    }),
    __metadata("design:type", organization_entity_1.Organization)
], Project.prototype, "organization", void 0);
__decorate([
    swagger_1.ApiProperty({
        type: () => user_entity_1.User,
    }),
    typeorm_1.ManyToMany(() => user_entity_1.User, (user) => user.likedProjects),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], Project.prototype, "likers", void 0);
__decorate([
    typeorm_1.Column(),
    swagger_1.ApiProperty({ example: 6 }),
    __metadata("design:type", Number)
], Project.prototype, "likeCount", void 0);
Project = __decorate([
    typeorm_1.Entity(),
    __metadata("design:paramtypes", [Number, String, String, Date,
        Date, String, Boolean, Boolean, organization_entity_1.Organization, Array])
], Project);
exports.Project = Project;
//# sourceMappingURL=project.entity.js.map