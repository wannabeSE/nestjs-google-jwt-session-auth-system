import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { UserDetails } from 'src/types/UserDetails';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}
  async validateGoogleAccountHolder(userDetails) {
    const user = await this.userService.findOne(userDetails.email);
    if (user){
        return {
            userId: user._id,
            email: user.email
        };
    } 
    const newUser = await this.userService.createUser(userDetails);
    return newUser;
  }
  async validateUser(credentials) {
    const user = await this.userService.findOne(credentials.email);
    if (user && bcrypt.compareSync(credentials.password, user.password)) { 
      return {
        userID: user._id,
        email: user.email
      };
    }
    return null;
  }
  async login(credentials) {
    const user = await this.validateUser(credentials)
    if (user) {
      const access_token = this.accessTokenGenerator(user);
      const refresh_token = this.refreshTokenGenerator(user);
      return { access_token, refresh_token };
    }
    return null;
  }
  accessTokenGenerator(user) {
    return this.jwtService.sign(user);
  }
  refreshTokenGenerator(user) {
    const refresh_token = this.jwtService.sign(user, {
      secret: process.env.REFRESH_TOKEN_SECRET,
      expiresIn: '1h',
    });
    return refresh_token;
  }
}
