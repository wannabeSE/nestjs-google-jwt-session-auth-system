import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
@Injectable()
export class LocalSessionAuthGuard extends AuthGuard('local') {
  //? if we used twitter auth then send 'twitter' as arg
  async canActivate(context: ExecutionContext) {
    const res = (await super.canActivate(context)) as boolean;
    const req = context.switchToHttp().getRequest();
    await super.logIn(req);
    return res;
  } //? only for sessions
}
