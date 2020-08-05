import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { isValidPassword } from '../utils/utils';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(payload: JwtPayload): Promise<any> {
    const user = await this.usersService.findByEmail(payload.email);

    if (user && isValidPassword(payload.password, user.encryptedPassword)) {
      const { encryptedPassword, ...result } = user;
      return result;
    }
    return null;
  }

  createToken(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }
}
