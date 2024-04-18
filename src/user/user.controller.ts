import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { User } from 'src/types/User';
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @UseGuards(JwtAuthGuard)
  @Get('all')
  allUser() {
    return this.userService.getAllUsers();
  }
  @Post('create-user')
  async createUser(@Body() user: User, @Res() res: Response): Promise<Response> {
    const userExists = await this.userService.findOne(user.email);
    if (userExists) {
      return res.status(400).json('Email is invalid or already taken');
    }
    const createdUser = await this.userService.createUser(user);
    return res.status(201).json(createdUser);
  }
}
