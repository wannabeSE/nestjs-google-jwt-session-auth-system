import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class RefreshTokenAuthGuard extends AuthGuard('jwt-refresh-token'){}