import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthLoginDto } from './dto/auth-login.dto';
import { UserService } from 'src/user/user.service';
import { JwtUserData } from 'market-app-bff-models';
import { JWT_EXPIRATION_TIME } from 'src/common/constants/auth.constant';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) { }

  async login({ email, password }: AuthLoginDto) {
    const user = await this.userService.handleGetUserByEmail(email);

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) throw new UnauthorizedException('Invalid email or password');

    const payload: Omit<JwtUserData, 'exp'> = {
      sub: user._id as unknown as string,
      name: user.name,
      iat: Date.now(),
    }

    return {
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: JWT_EXPIRATION_TIME,
        secret: process.env.JWT_SECRET,
      })
    };
  }
}
