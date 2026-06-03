import { Inject, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/provider/auth.service';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { CreateUserProvider } from './create-user.provider';
import { GetUserByEmailProvider } from './get-user-by-email.provider';

/**
 * user management service
 */

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    /**  Inject the Create user provider to use it */
    private readonly createUserProvider: CreateUserProvider,

    /**  Inject the AuthService to use its hashing capabilities */
    private readonly getUserByEmailProvider: GetUserByEmailProvider,
  ) {}

  /**
   * Get user by id
   */
  public async getUserById(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    return user;
  }

  /**
   * Get user by email
   */
  public async getUserByEmail(email: string): Promise<User> {
    return await this.getUserByEmailProvider.getUserByEmail(email);
  }

  /**
   * Get all users
   */

  getUsers(authService: AuthService) {
    const isAuth = authService.isAuth(1);
    if (!isAuth.auth) {
      return 'you are not authorized to access this resource';
    }
    return [
      {
        id: 1,
        name: 'John Doe',
        age: 30,
      },
      {
        id: 2,
        name: 'Jane Doe',
        age: 25,
      },
    ];
  }

  /**
   * Create a new user
   */
  public async createUser(createUserDto: CreateUserDto) {
    return await this.createUserProvider.createUser(createUserDto);
  }
}
