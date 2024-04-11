import { Get, Body, Controller, Post, Req, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local.guard';
import { JwtAuthGuard } from './guards/jwt.guard';
import { GoogleAuthGuard } from './guards/google.guard';
import { LocalSessionAuthGuard } from './guards/session.guard';
import { SessionGuard } from './guards/protection.guard';
import { RefreshTokenAuthGuard } from './guards/jwt-refresh.guard';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }
  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  googleLogin() { }

  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  googleLoginRedirect(@Request() req) {
    console.log('google/callback', req.user);
    return req.user;
  }
  @Get('status')
  async getCurrentUser(@Request() req) {
    console.log('from getCurrentUser');
    if (req.user) {
      console.log(await req.user);
      return await req.user;
    }
    return 'no user';
  }
  @UseGuards(LocalSessionAuthGuard)
  @Post('session')
  async sessionControl(@Request() req) {
    return await req.user;
  }

  @Post('login')
  async login(@Body() credentials) { //?mod
    const user = await this.authService.validateUser(credentials);
    if (user) {
      const access_token = this.authService.login(user);
      const refresh_token = this.authService.refreshToken(user);
      return { access_token, refresh_token };
    }
    return null;
  }
  @Post('refresh')
  @UseGuards(RefreshTokenAuthGuard)
  async refreshToken(@Request() req) {
    const user = req.user;
    const accessToken = this.authService.login(user);
    return { accessToken };
  }
}
