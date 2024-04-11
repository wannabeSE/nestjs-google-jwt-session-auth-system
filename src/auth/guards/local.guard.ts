import { Injectable, ExecutionContext } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
@Injectable()
export class LocalAuthGuard extends AuthGuard('local'){
    // canActivate(
    //     context: ExecutionContext,
    //   ): boolean | Promise<boolean> | Observable<boolean> {
    //     console.log('Hello, World');
    //     return super.canActivate(context);
    //   }
    async canActivate(context: ExecutionContext) {
        const res = (await super.canActivate(context)) as boolean;
        const req = context.switchToHttp().getRequest();
        await super.logIn(req);
        return res;
    }
}