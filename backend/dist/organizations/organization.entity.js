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
exports.Organization = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const user_entity_1 = require("../users/user.entity");
const project_entity_1 = require("../projects/project.entity");
let Organization = class Organization {
    constructor(id, EIN, name, description, phoneNumber, email, contactFirstName, contactLastName, adminUser) {
        this.id = id;
        this.EIN = EIN;
        this.name = name;
        this.description = description;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.contactFirstName = contactFirstName;
        this.contactLastName = contactLastName;
        this.adminUser = adminUser;
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    swagger_1.ApiProperty({ example: 1 }),
    __metadata("design:type", Number)
], Organization.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    swagger_1.ApiProperty({ example: '12-3456789' }),
    __metadata("design:type", String)
], Organization.prototype, "EIN", void 0);
__decorate([
    typeorm_1.Column(),
    swagger_1.ApiProperty({ example: 'Apple' }),
    __metadata("design:type", String)
], Organization.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ length: '1023' }),
    swagger_1.ApiProperty({
        example: 'Apple Inc. is an American multinational technology company headquartered in Cupertino, California, that designs, develops, and sells consumer electronics, computer software, and online services. It is considered one of the Big Tech technology companies, alongside Amazon, Google, Microsoft, and Facebook',
    }),
    __metadata("design:type", String)
], Organization.prototype, "description", void 0);
__decorate([
    typeorm_1.Column(),
    swagger_1.ApiProperty({ example: '+001 (012) 012-0123' }),
    __metadata("design:type", String)
], Organization.prototype, "phoneNumber", void 0);
__decorate([
    typeorm_1.Column({ unique: true }),
    swagger_1.ApiProperty({ example: 'stevejobs@apple.com' }),
    __metadata("design:type", String)
], Organization.prototype, "email", void 0);
__decorate([
    typeorm_1.Column(),
    swagger_1.ApiProperty({ example: 'John' }),
    __metadata("design:type", String)
], Organization.prototype, "contactFirstName", void 0);
__decorate([
    typeorm_1.Column(),
    swagger_1.ApiProperty({ example: 'Doe' }),
    __metadata("design:type", String)
], Organization.prototype, "contactLastName", void 0);
__decorate([
    typeorm_1.Column(),
    typeorm_1.CreateDateColumn(),
    swagger_1.ApiProperty({ example: new Date('2020-08-25T22:50:43.000Z') }),
    __metadata("design:type", Date)
], Organization.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Column(),
    typeorm_1.UpdateDateColumn(),
    swagger_1.ApiProperty({ example: new Date('2020-10-15T22:50:43.000Z') }),
    __metadata("design:type", Date)
], Organization.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.OneToOne(() => user_entity_1.User, (user) => user.ownedOrganization),
    swagger_1.ApiProperty({ example: user_entity_1.User }),
    __metadata("design:type", user_entity_1.User)
], Organization.prototype, "adminUser", void 0);
__decorate([
    typeorm_1.OneToMany(() => project_entity_1.Project, (project) => project.organization),
    swagger_1.ApiProperty({ type: () => [project_entity_1.Project] }),
    __metadata("design:type", Array)
], Organization.prototype, "projects", void 0);
Organization = __decorate([
    typeorm_1.Entity(),
    __metadata("design:paramtypes", [Number, String, String, String, String, String, String, String, user_entity_1.User])
], Organization);
exports.Organization = Organization;
//# sourceMappingURL=organization.entity.js.map