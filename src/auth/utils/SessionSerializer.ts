import { PassportSerializer } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { UserService } from "src/user/user.service";

@Injectable()
export class SessionSerializer extends PassportSerializer{
    constructor(private userService: UserService){
        super();
    }
    serializeUser(user: any, done: Function) {
        console.log('in serializer');
        console.log('serializer => ',user);
        
        done(null, user);
    }
    deserializeUser(payload: any, done: Function) {
        console.log('in deserializer');
        console.log(payload);
        
        const user = this.userService.findOne(payload.email);
        //const {password, ...rest } = user;
        return user ? done(null,user) : done(null, null);
    }
}