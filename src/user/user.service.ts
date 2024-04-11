import { Injectable, NotImplementedException } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from 'src/model/user.model';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }
    async createUser(user) {
        //user.password = bcrypt.hashSync(user.password, 10);
        user.password = bcrypt.hashSync(user.password, 10);
        const newUser = await this.userModel.create(user);
        //const { password, ...rest } = newUser;
        //console.log('REST\n', rest);
        return newUser;
        // const createdUser = await users.push({
        //     id: payload.id,
        //     username: payload.username,
        //     email: payload.email
        // })
        // // console.log('created user->',createdUser);
        // // console.log(users[3]);
        // console.log(users);

        // return users[createdUser - 1];
    }
    async findOne(email: string) {
        const user = await this.userModel.findOne({ email })
        console.log('findOne', user);
        return user || null;
    }
    getAllUsers() {
        return this.userModel.find();
    }
}
