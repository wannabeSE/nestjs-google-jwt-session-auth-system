import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [AuthModule, UserModule, MongooseModule.forRoot(
    'mongodb+srv://jsamir724:jauthpass1@jauth-cluster-0.pimeayh.mongodb.net/',
  ),],
  controllers: [],
  providers: [],
})
export class AppModule { }
