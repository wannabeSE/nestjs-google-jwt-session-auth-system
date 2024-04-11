import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import {Strategy, ExtractJwt} from 'passport-jwt';
@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'JWTSECRETAUTH@!'
        })
    }
    validate(payload: any){
        return {
            id: payload.id,
            name: payload.name
        }
    }
}