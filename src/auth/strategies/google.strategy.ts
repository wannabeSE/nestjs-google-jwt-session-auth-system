import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';
import { Payload } from 'src/types/Payload';
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CB_URL,
      scope: ['profile', 'email'],
    });
  }
  async validate(
    access_token: string,
    refresh_token: string,
    profile: Profile,
  ): Promise<Payload> {
    const user = await this.authService.validateGoogleAccountHolder({
      username: profile.displayName.replace(/\s/g, '').toLowerCase() + profile.id,
      email: profile.emails[0].value,
      password: 'google',
    });
    return user || null;
  }
}
