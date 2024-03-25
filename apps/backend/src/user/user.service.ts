import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './repositories/user.repository';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository
  ) { }

  async handleCreateUser(user: CreateUserDto) {
    if (await this.userRepository.checkUserExists(user.email)) {
      throw new ForbiddenException('User already exists');
    }

    const saltOrRounds = 10;
    const hash = await bcrypt.hash(user.password, saltOrRounds);

    const userToCreate = {
      ...user,
      password: hash
    }

    return this.userRepository.createUser(userToCreate);
  }

  async handleGetUserByEmail(email: string) {
    const user = await this.userRepository.filterUser({ email });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }
}
