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
exports.UserDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class UserDto {
}
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiProperty({ example: 'Jane' }),
    __metadata("design:type", String)
], UserDto.prototype, "firstName", void 0);
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiProperty({ example: 'Doe' }),
    __metadata("design:type", String)
], UserDto.prototype, "lastName", void 0);
__decorate([
    class_validator_1.IsMobilePhone('en-US'),
    swagger_1.ApiProperty({ example: '(718) 222-4041' }),
    __metadata("design:type", String)
], UserDto.prototype, "phoneNumber", void 0);
__decorate([
    class_validator_1.IsEmail(),
    swagger_1.ApiProperty({ example: 'name@email.com' }),
    __metadata("design:type", String)
], UserDto.prototype, "email", void 0);
__decorate([
    swagger_1.ApiProperty({ example: 'unguessable_password' }),
    __metadata("design:type", String)
], UserDto.prototype, "password", void 0);
__decorate([
    class_validator_1.MaxLength(1000),
    class_validator_1.IsString(),
    swagger_1.ApiProperty({
        example: '"John Doe" (for males) and "Jane Doe" (for females) are multiple-use names that are used when the true name of a person is unknown or is being intentionally concealed.',
    }),
    __metadata("design:type", String)
], UserDto.prototype, "description", void 0);
exports.UserDto = UserDto;
//# sourceMappingURL=user.dto.js.map