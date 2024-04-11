import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './stratigies/local.strategy';
import { JwtAuthStrategy } from './stratigies/jwt.strategy';
import { GoogleStrategy } from './stratigies/google.strategy';
import { SessionSerializer } from './utils/SessionSerializer';
import { UserModule } from 'src/user/user.module';
import { JwtRefreshTokenStrategy } from './stratigies/jwt-refresh-token.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule.register({
      session: true
    }),
    JwtModule.register({
      secret: 'JWTSECRETAUTH@!',
      signOptions: {
        expiresIn: '60s'
      }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtAuthStrategy, GoogleStrategy, JwtRefreshTokenStrategy, SessionSerializer]
})
export class AuthModule { }
