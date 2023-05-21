import { Injectable } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
  signUp(authCredentialsDto: AuthCredentialsDto) {
    return authCredentialsDto;
  }
}
