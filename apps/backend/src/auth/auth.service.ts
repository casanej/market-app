import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthLoginDto } from './dto/auth-login.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) { }

  async login({ email, password }: AuthLoginDto) {
    const user = await this.userService.handleGetUserByEmail(email);

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) throw new ForbiddenException('Invalid email or password');

    const payload = {
      sub: user._id,
      name: user.name,
      iat: Date.now()
    }

    return {
      accessToken: await this.jwtService.signAsync(payload)
    };
  }
}
