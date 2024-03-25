import { FilterQuery, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UsersModel } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(UsersModel.name) private userModel: Model<UsersModel>) { }

  async filterUser(filter: FilterQuery<UsersModel>) {
    return await this.userModel.findOne(filter);
  }

  async createUser(user: CreateUserDto) {
    return await this.userModel.create({ name: user.name, email: user.email, password: user.password });
  }

  async checkUserExists(email: string) {
    return await this.userModel.countDocuments({ email }) >= 1;
  }

  async updateLastLogin(id: string) {
    return await this.userModel.updateOne({ id }, { lastLogin: Date.now() });
  }
}
