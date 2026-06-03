import {
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class GetUserByEmailProvider {
  constructor(
    /**  Inject the UsersService to use its user management capabilities */
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async getUserByEmail(email: string): Promise<User> {
    let user: User | null;
    try {
      user = await this.userRepository.findOneBy({ email });
    } catch (error) {
      throw new RequestTimeoutException('Error fetching user');
    }

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
