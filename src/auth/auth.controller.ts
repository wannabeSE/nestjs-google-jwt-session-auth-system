import { Get, Body, Controller, Post, Req, Request, UseGuards, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local.guard';
import { JwtAuthGuard } from './guards/jwt.guard';
import { GoogleAuthGuard } from './guards/google.guard';
import { LocalSessionAuthGuard } from './guards/session.guard';
import { SessionGuard } from './guards/protection.guard';
import { RefreshTokenAuthGuard } from './guards/jwt-refresh.guard';
import { UserDetails } from 'src/types/UserDetails';
import { Response } from 'express';
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
  @Post('login/session')
  async sessionControl(@Request() req) {
    return await req.user;
  }

  @Post('login/token')
  async login(@Body() credentials: UserDetails, @Res() res: Response) { //?mod
    const token = await this.authService.login(credentials);
    return token ? token : res.status(401).json('Invalid Email or password');
  }
  @Post('refresh-token')
  @UseGuards(RefreshTokenAuthGuard)
  async refreshToken(@Request() req) {
    const user = req.user;
    const accessToken = this.authService.login(user);
    return { accessToken };
  }
}
