import {
  Controller,
  Body,
  Post,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiProperty,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { User } from '../users/user.entity';
import { UserDto } from '../users/user.dto';

class AuthResponse {
  @ApiProperty({
    description: 'The JSON Web Token',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGVtYWlsLmNvbSIsInBhc3N3b3JkIjoicGFzc3dvcmQiLCJpYXQiOjE1OTgzNjc0NDIsImV4cCI6MTU5OTIzMTQ0Mn0.dcidxRTUUi4mJrnbwqLzQcZ5KwIWnZ2QdSQa8DNt874',
  })
  accessToken: string;

  @ApiProperty()
  user: User;
}

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) { }

  @Post('login')
  @ApiOperation({ summary: 'Logs in as a user' })
  @ApiResponse({
    status: 201,
    description: 'Returns the accessToken and the corresponding user',
    type: AuthResponse,
  })
  @ApiResponse({
    status: 401,
    description:
      'Unauthorized access. The email and password combination do not match or do not exist.',
  })
  async login(@Body() payload: JwtPayload): Promise<AuthResponse> {
    const user = await this.authService.validateUser(payload);

    if (!user) {
      throw new HttpException(
        `Unauthorized access. The email and password combination do not match or do not exist`,
        HttpStatus.UNAUTHORIZED,
      );
    }

    return {
      accessToken: this.authService.createToken(payload),
      user,
    };
  }

  @Post('signup')
  @ApiOperation({ summary: "Creates a user and returns it's access token" })
  @ApiResponse({
    status: 201,
    description: 'Sends the JSON Web Token and the corresponding user',
    type: AuthResponse,
  })
  @ApiResponse({
    status: 401,
    description:
      'Unauthorized access. The email and password combination do not match or do not exist.',
  })
  async signup(@Body() userDto: UserDto): Promise<AuthResponse> {
    await this.usersService.create(userDto);
    const credentials: JwtPayload = {
      email: userDto.email,
      password: userDto.password,
    };

    const user = await this.authService.validateUser(credentials);

    if (!user) {
      throw new HttpException(
        `Unauthorized access. The email and password combination do not match or do not exist.`,
        HttpStatus.UNAUTHORIZED,
      );
    }

    return {
      accessToken: this.authService.createToken(credentials),
      user,
    };
  }
}
