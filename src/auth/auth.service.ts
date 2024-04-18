import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { UserDetails } from 'src/types/UserDetails';
import { User } from 'src/types/User';
import { Payload } from 'src/types/Payload';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}
  async validateGoogleAccountHolder(gUserDetails: User): Promise<Payload> {
    const user = await this.userService.findOne(gUserDetails.email);
    if (user) {
      return {
        userID: user.id,
        email: user.email,
      };
    }
    const newUser = await this.userService.createUser(gUserDetails);
    return newUser;
  }
  async validateUser(credentials: UserDetails): Promise<Payload> {
    const user = await this.userService.findOne(credentials.email);
    if (user && bcrypt.compareSync(credentials.password, user.password)) {
      return {
        userID: user.id,
        email: user.email,
      };
    }
    return null;
  }
  async login(credentials: UserDetails): Promise<Record<string, string>> {
    const user = await this.validateUser(credentials);
    if (user) {
      const access_token = this.accessTokenGenerator(user);
      const refresh_token = this.refreshTokenGenerator(user);
      return { access_token, refresh_token };
    }
    return null;
  }
  accessTokenGenerator(user: any): string {
    return this.jwtService.sign(user);
  }
  refreshTokenGenerator(user: any): string {
    const refresh_token = this.jwtService.sign(user, {
      secret: process.env.REFRESH_TOKEN_SECRET,
      expiresIn: '24h',
    });
    return refresh_token;
  }
}
