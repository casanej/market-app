import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema, UsersModel } from "./entities/user.entity";
import { UserRepository } from "./repositories/user.repository";
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UsersModel.name, schema: UserSchema }])
  ],
  controllers: [UserController],
  providers: [UserRepository, UserService],
  exports: [UserService]
})
export class UserModule { }
