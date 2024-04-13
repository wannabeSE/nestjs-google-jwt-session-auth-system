import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [ConfigModule.forRoot(),AuthModule, UserModule, MongooseModule.forRoot(
    process.env.MONGODB_URL,
  ),],
  controllers: [],
  providers: [],
})
export class AppModule { }
