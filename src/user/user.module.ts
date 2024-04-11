import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserModel } from 'src/model/user.model';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: User.name,
                schema: UserModel,
            },
        ]),
    ],
    providers: [UserService],
    controllers: [UserController],
    exports: [UserService]
})
export class UserModule { }
