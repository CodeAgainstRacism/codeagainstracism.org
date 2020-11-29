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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
const organization_entity_1 = require("../organizations/organization.entity");
const project_entity_1 = require("../projects/project.entity");
let User = class User {
    constructor(id, firstName, lastName, email, encryptedPassword) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.encryptedPassword = encryptedPassword;
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    swagger_1.ApiProperty({ example: 1 }),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    swagger_1.ApiProperty({ example: 'Jane' }),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    typeorm_1.Column(),
    swagger_1.ApiProperty({ example: 'Doe' }),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    typeorm_1.Column(),
    swagger_1.ApiProperty({ example: '+001 (012) 012-0123' }),
    __metadata("design:type", String)
], User.prototype, "phoneNumber", void 0);
__decorate([
    typeorm_1.Column({ unique: true }),
    swagger_1.ApiProperty({ example: 'email@email.com' }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    typeorm_1.Column({ select: false }),
    class_transformer_1.Exclude({ toPlainOnly: true }),
    __metadata("design:type", String)
], User.prototype, "encryptedPassword", void 0);
__decorate([
    typeorm_1.Column(),
    swagger_1.ApiProperty({
        example: '"John Doe" (for males) and "Jane Doe" (for females) are multiple-use names that are used when the true name of a person is unknown or is being intentionally concealed.',
    }),
    __metadata("design:type", String)
], User.prototype, "description", void 0);
__decorate([
    typeorm_1.Column(),
    typeorm_1.CreateDateColumn(),
    swagger_1.ApiProperty({ example: new Date('2020-07-11T13:08:16.364Z') }),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Column(),
    typeorm_1.UpdateDateColumn(),
    swagger_1.ApiProperty({ example: new Date('2020-07-12T22:50:43.000Z') }),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.OneToOne(() => organization_entity_1.Organization, (organization) => organization.adminUser),
    typeorm_1.JoinColumn(),
    swagger_1.ApiProperty({
        type: () => organization_entity_1.Organization,
    }),
    __metadata("design:type", organization_entity_1.Organization)
], User.prototype, "ownedOrganization", void 0);
__decorate([
    swagger_1.ApiProperty({
        type: () => project_entity_1.Project,
    }),
    typeorm_1.ManyToMany(() => project_entity_1.Project, (project) => project.likers),
    __metadata("design:type", Array)
], User.prototype, "likedProjects", void 0);
User = __decorate([
    typeorm_1.Entity(),
    __metadata("design:paramtypes", [Number, String, String, String, String])
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map