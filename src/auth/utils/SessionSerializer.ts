import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { Payload } from 'src/types/Payload';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private userService: UserService) {
    super();
  }
  serializeUser(user: any, done: Function) {
    done(null, user);
  }
  async deserializeUser(payload: Payload, done: Function) {
    const user = await this.userService.findOne(payload.email);
    return user ? done(null, user) : done(null, null);
  }
}
