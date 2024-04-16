import {
  Get,
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './guards/google.guard';
import { LocalSessionAuthGuard } from './guards/session.guard';
import { RefreshTokenAuthGuard } from './guards/jwt-refresh.guard';
import { UserDetails } from 'src/types/UserDetails';
import { Response } from 'express';
import { JwtAuthGuard } from './guards/jwt.guard';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  googleLogin() {}

  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  async googleLoginRedirect(@Request() req) {
    return await req.user;
  }
  @Get('session/profile')
  async getCurrentUserBySession(
    @Request() req,
    @Res() res: Response,
  ): Promise<Response> {
    if (req.user) {
      return res.status(200).json({
        userID: req.user.id,
        email: req.user.email
      })
    }
    return res.status(404).json('no user found');
  }
  @UseGuards(LocalSessionAuthGuard)
  @Post('login/session')
  async sessionControl(@Request() req) {
    return await req.user;
  }
  @UseGuards(JwtAuthGuard)
  @Post('jwt/profile')
  getCurrentUserByToken(@Request() req){
    return req.user;
  }
  @Post('login/jwt')
  async login(
    @Body() credentials: UserDetails,
    @Res() res: Response,
  ): Promise<Response> {
    const token = await this.authService.login(credentials);
    return token
      ? res.status(201).json(token)
      : res.status(401).json('Invalid Email or password');
  }
  @Post('refresh-token')
  @UseGuards(RefreshTokenAuthGuard)
  async refreshToken(@Request() req) {
    const accessToken = this.authService.accessTokenGenerator(req.user);
    return { accessToken };
  }
}
