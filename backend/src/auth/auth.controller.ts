import {
  Controller,
  Body,
  Post,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() payload: JwtPayload): Promise<any> {
    const organization = await this.authService.validateOrganization(payload);

    if (!organization) {
      throw new HttpException(
        `Unauthorized access. The email and password combination do not match or do not exist.`,
        HttpStatus.UNAUTHORIZED,
      );
    }

    return {
      accessToken: this.authService.createToken(payload),
      organization: organization,
    };
  }
}
