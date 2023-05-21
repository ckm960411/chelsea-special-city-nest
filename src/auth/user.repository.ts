import { CustomRepository } from 'src/typeorm/typeorm-ex.decarator';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@CustomRepository(User)
export class UserRepository extends Repository<User> {}
