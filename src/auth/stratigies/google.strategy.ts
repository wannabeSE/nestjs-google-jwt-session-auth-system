import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, Profile } from 'passport-google-oauth20';
import { AuthService } from "../auth.service";
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            clientID: '76763994138-dtr4t354h1drh0bbb6dctntbq85tm6d3.apps.googleusercontent.com',
            clientSecret: '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',
            callbackURL: 'http://localhost:3000/auth/google/callback',
            scope: ['profile', 'email'],
        })
    }
    async validate(access_token, refresh_token, profile: Profile){
        console.log('goo val');
        
        const user = await this.authService.validateGoogleAccountHolder({
            // id: profile.id,
            username:profile.displayName,
            email:profile.emails[0].value,
            password: 'dfldhsflshf',
        })
        console.log('google val->',user);
        
        return user || null;
    }
}