import {
  Get,
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './guards/google.guard';
import { LocalSessionAuthGuard } from './guards/session.guard';
import { RefreshTokenAuthGuard } from './guards/jwt-refresh.guard';
import { UserDetails } from 'src/types/UserDetails';
import { Response, Request } from 'express';
import { JwtAuthGuard } from './guards/jwt.guard';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  googleLogin() {}

  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  googleLoginRedirect(@Req() req: Request, @Res() res: Response) {
    res.redirect('http://localhost:3001/'); //* add your own frontend success redirect url
    return req.user;
  }
  @Get('session/profile')
  async getCurrentUserBySession(
    @Req() req,
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
  @Post('session/login')
  async sessionControl(@Req() req: Request) {
    return req.user;
  }
  @Get('session/logout')
  sessionLogout(@Req() req: Request, @Res() res: Response){
    req.session.destroy(() => {
      res.status(200).json('Logged out')
    })
  }
  @UseGuards(JwtAuthGuard)
  @Post('jwt/profile')
  getCurrentUserByToken(@Req() req: Request){
    return req.user;
  }
  @Post('jwt/login')
  async login(
    @Body() credentials: UserDetails,
    @Res() res: Response,
  ): Promise<Response> {
    const token = await this.authService.login(credentials);
    return token
      ? res.status(201).json(token)
      : res.status(401).json('Invalid Email or password');
  }
  @Post('jwt/refresh-token')
  @UseGuards(RefreshTokenAuthGuard)
  async refreshToken(@Req() req: Request): Promise<Record<string, string>> {
    const access_token = this.authService.accessTokenGenerator(req.user);
    return { access_token };
  }
}
