import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { OrganizationsService } from '../organizations/organizations.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private organizationsService: OrganizationsService,
    private jwtService: JwtService,
  ) {}

  async validateOrganization(payload: JwtPayload): Promise<any> {
    const organization = await this.organizationsService.findByEmail(
      payload.email,
    );

    if (
      organization &&
      bcrypt.compareSync(payload.password, organization.encryptedPassword)
    ) {
      const { encryptedPassword, ...result } = organization;
      return result;
    }
    return null;
  }

  createToken(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }
}
