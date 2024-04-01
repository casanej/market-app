import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Public } from 'src/common/decorator/public-route.decorator';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) { }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post()
  createUser(@Body() body: CreateUserDto) {
    return this.userService.handleCreateUser(body);
  }
}
