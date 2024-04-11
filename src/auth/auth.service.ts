import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService, private userService: UserService) { }
    async validateGoogleAccountHolder(userDetails) {
        const user = await this.userService.findOne(userDetails.email);
        if (user) return user;
        const newUser = await this.userService.createUser(userDetails);
        return newUser;
    }
    async validateUser(payload) {
        const user = await this.userService.findOne(payload.email);
        const match = bcrypt.compareSync(payload.password, user.password); //* (plainPassword, hashedPassword)
        if (user && match) {
            return user;
        }
        else throw new UnauthorizedException();

    }
    login(user) {
        const payload = { email: user.email, sub: user.userId }
        return this.jwtService.sign(payload);
    }
    refreshToken(user) {
        const payload = { email: user.email, sub: user.userId }
        const refresh_token = this.jwtService.sign(payload, {
            secret: "REFRESHTOKENAUTHSECRET!@",
            expiresIn: '1h',
        })
        return refresh_token;
    }
}
