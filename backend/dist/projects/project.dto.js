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
exports.ProjectDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
const projects_validator_1 = require("./projects.validator");
class ProjectDto {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    swagger_1.ApiProperty({ example: 'Code Against Racism' }),
    __metadata("design:type", String)
], ProjectDto.prototype, "name", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.MaxLength(1000),
    class_validator_1.IsString(),
    swagger_1.ApiProperty({ example: 'A cool project !' }),
    __metadata("design:type", String)
], ProjectDto.prototype, "description", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsDate(),
    class_transformer_1.Type(() => Date),
    swagger_1.ApiProperty({ example: '2020/06/05' }),
    __metadata("design:type", Date)
], ProjectDto.prototype, "startDate", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsDate(),
    projects_validator_1.IsValidDate("startDate", { message: "Project end date must be greater than the start date." }),
    class_transformer_1.Type(() => Date),
    swagger_1.ApiProperty({ example: '2020/07/16' }),
    __metadata("design:type", Date)
], ProjectDto.prototype, "endDate", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.MaxLength(300),
    class_validator_1.IsString(),
    swagger_1.ApiProperty({ example: 'https://i.imgur.com/TTFCXdv.png' }),
    __metadata("design:type", String)
], ProjectDto.prototype, "imageURL", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    swagger_1.ApiProperty({ example: 'React.ts, apollo server(graphql), typeorm, any headless cms' }),
    __metadata("design:type", String)
], ProjectDto.prototype, "qualificationsNeeded", void 0);
__decorate([
    swagger_1.ApiProperty({ example: 1 }),
    __metadata("design:type", Number)
], ProjectDto.prototype, "organizationId", void 0);
exports.ProjectDto = ProjectDto;
//# sourceMappingURL=project.dto.js.map