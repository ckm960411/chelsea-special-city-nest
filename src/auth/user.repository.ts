import { CustomRepository } from 'src/typeorm/typeorm-ex.decarator';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { hash } from 'bcrypt';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@CustomRepository(User)
export class UserRepository extends Repository<User> {
  async registerUser(authCredentialsDto: AuthCredentialsDto) {
    const { username, email, password } = authCredentialsDto;

    const hashedPassword = await hash(password, 10);

    const user = this.create({
      username,
      email,
      password: hashedPassword,
    });

    try {
      return await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('이미 존재하는 이메일입니다');
      } else {
        console.log(error);
        throw new InternalServerErrorException();
      }
    }
  }

  async findUserByEmail(email: string) {
    const user = await this.findOne({
      where: { email },
    });

    return user;
  }
}
