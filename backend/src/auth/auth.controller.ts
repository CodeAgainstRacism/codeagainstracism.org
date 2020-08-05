import {
  Controller,
  Body,
  Post,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Logs in as a user' })
  @ApiResponse({
    status: 201,
    description: 'Sends the accessToken and the corresponding user',
  })
  @ApiResponse({
    status: 401,
    description:
      'Unauthorized access. The email and password combination do not match or do not exist.',
  })
  async login(@Body() payload: JwtPayload): Promise<any> {
    const user = await this.authService.validateUser(payload);

    if (!user) {
      throw new HttpException(
        `Unauthorized access. The email and password combination do not match or do not exist.`,
        HttpStatus.UNAUTHORIZED,
      );
    }

    return {
      accessToken: this.authService.createToken(payload),
      user,
    };
  }
}
