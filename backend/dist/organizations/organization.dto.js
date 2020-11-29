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
exports.OrganizationDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class OrganizationDto {
}
__decorate([
    class_validator_1.Length(10, 10),
    class_validator_1.IsString(),
    swagger_1.ApiProperty({ example: '12-3456789' }),
    __metadata("design:type", String)
], OrganizationDto.prototype, "EIN", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    swagger_1.ApiProperty({ example: 'Code Against Racism' }),
    __metadata("design:type", String)
], OrganizationDto.prototype, "name", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.MaxLength(1000),
    class_validator_1.IsString(),
    swagger_1.ApiProperty({
        example: 'Code Against Racism seeks to use the power of technology to help forward the missions of organizations seeking to end racism.',
    }),
    __metadata("design:type", String)
], OrganizationDto.prototype, "description", void 0);
__decorate([
    class_validator_1.IsMobilePhone('en-US'),
    swagger_1.ApiProperty({ example: '(718) 222-4041' }),
    __metadata("design:type", String)
], OrganizationDto.prototype, "phoneNumber", void 0);
__decorate([
    class_validator_1.IsEmail(),
    swagger_1.ApiProperty({ example: 'name@email.com' }),
    __metadata("design:type", String)
], OrganizationDto.prototype, "email", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.MaxLength(100),
    class_validator_1.IsString(),
    swagger_1.ApiProperty({ example: 'Jane' }),
    __metadata("design:type", String)
], OrganizationDto.prototype, "contactFirstName", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.MaxLength(100),
    class_validator_1.IsString(),
    swagger_1.ApiProperty({ example: 'Doe' }),
    __metadata("design:type", String)
], OrganizationDto.prototype, "contactLastName", void 0);
__decorate([
    class_validator_1.IsNumber(),
    swagger_1.ApiProperty({ example: 1 }),
    __metadata("design:type", Number)
], OrganizationDto.prototype, "adminUserId", void 0);
exports.OrganizationDto = OrganizationDto;
//# sourceMappingURL=organization.dto.js.map