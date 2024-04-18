import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from 'src/model/user.model';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Payload } from 'src/types/Payload';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async createUser(user: User): Promise<Payload> {
    user.password = bcrypt.hashSync(user.password, 10);
    const newUser = await this.userModel.create(user);
    return {
      userID: newUser.id,
      email: newUser.email,
    };
  }
  async findOne(email: string) {
    const user = await this.userModel.findOne({ email });
    return user || null;
  }
  getAllUsers() {
    return this.userModel.find();
  }
}
