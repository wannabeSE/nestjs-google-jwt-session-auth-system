import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from 'passport-local';
import { AuthService } from "../auth.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super();
    }

    async validate(username: string, password: string) {
        console.log('inside localstrat');
        const user = await this.authService.validateUser({ email: username, password: password });
        console.log(user);

        if (!user) null;
        return user;
    }
}