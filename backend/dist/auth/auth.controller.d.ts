import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { User } from '../users/user.entity';
import { UserDto } from '../users/user.dto';
declare class AuthResponse {
    accessToken: string;
    user: User;
}
export declare class AuthController {
    private authService;
    private usersService;
    constructor(authService: AuthService, usersService: UsersService);
    login(payload: JwtPayload): Promise<AuthResponse>;
    signup(userDto: UserDto): Promise<AuthResponse>;
}
export {};
