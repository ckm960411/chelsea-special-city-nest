import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { LoginRequestDto } from './dto/login-request.dto';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  signUp(authCredentialsDto: AuthCredentialsDto) {
    return this.userRepository.registerUser(authCredentialsDto);
  }

  async signIn({ email, password }: LoginRequestDto) {
    const user = await this.userRepository.findUserByEmail(email);

    if (user && (await compare(password, user.password))) {
      const payload = { email };
      const accessToken = await this.jwtService.sign(payload);

      return { accessToken };
    } else {
      throw new UnauthorizedException('로그인에 실패했습니다.');
    }
  }
}
