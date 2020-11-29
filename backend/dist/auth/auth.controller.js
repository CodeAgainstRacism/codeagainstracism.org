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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_service_1 = require("./auth.service");
const users_service_1 = require("../users/users.service");
const jwt_payload_interface_1 = require("./interfaces/jwt-payload.interface");
const user_entity_1 = require("../users/user.entity");
const user_dto_1 = require("../users/user.dto");
class AuthResponse {
}
__decorate([
    swagger_1.ApiProperty({
        description: 'The JSON Web Token',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGVtYWlsLmNvbSIsInBhc3N3b3JkIjoicGFzc3dvcmQiLCJpYXQiOjE1OTgzNjc0NDIsImV4cCI6MTU5OTIzMTQ0Mn0.dcidxRTUUi4mJrnbwqLzQcZ5KwIWnZ2QdSQa8DNt874',
    }),
    __metadata("design:type", String)
], AuthResponse.prototype, "accessToken", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", user_entity_1.User)
], AuthResponse.prototype, "user", void 0);
let AuthController = class AuthController {
    constructor(authService, usersService) {
        this.authService = authService;
        this.usersService = usersService;
    }
    async login(payload) {
        const user = await this.authService.validateUser(payload);
        if (!user) {
            throw new common_1.HttpException(`Unauthorized access. The email and password combination do not match or do not exist.`, common_1.HttpStatus.UNAUTHORIZED);
        }
        return {
            accessToken: this.authService.createToken(payload),
            user,
        };
    }
    async signup(userDto) {
        await this.usersService.create(userDto);
        const credentials = {
            email: userDto.email,
            password: userDto.password,
        };
        const user = await this.authService.validateUser(credentials);
        if (!user) {
            throw new common_1.HttpException(`Unauthorized access. The email and password combination do not match or do not exist.`, common_1.HttpStatus.UNAUTHORIZED);
        }
        return {
            accessToken: this.authService.createToken(credentials),
            user,
        };
    }
};
__decorate([
    common_1.Post('login'),
    swagger_1.ApiOperation({ summary: 'Logs in as a user' }),
    swagger_1.ApiResponse({
        status: 201,
        description: 'Returns the accessToken and the corresponding user',
        type: AuthResponse,
    }),
    swagger_1.ApiResponse({
        status: 401,
        description: 'Unauthorized access. The email and password combination do not match or do not exist.',
    }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [jwt_payload_interface_1.JwtPayload]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    common_1.Post('signup'),
    swagger_1.ApiOperation({ summary: "Creates a user and returns it's access token" }),
    swagger_1.ApiResponse({
        status: 201,
        description: 'Sends the JSON Web Token and the corresponding user',
        type: AuthResponse,
    }),
    swagger_1.ApiResponse({
        status: 401,
        description: 'Unauthorized access. The email and password combination do not match or do not exist.',
    }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signup", null);
AuthController = __decorate([
    common_1.Controller('auth'),
    swagger_1.ApiTags('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        users_service_1.UsersService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map