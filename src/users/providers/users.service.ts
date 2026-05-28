import { Inject, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/provider/auth.service';
import { Repository } from 'typeorm';
import { Users } from '../users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dto/create-user.dto';

/**
 * user management service
 */

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  /**
   * Get user by id
   */
  getUserById(id: number) {
    return {
      id,
      name: 'John Doe',
      age: 30,
    };
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
    const user = await this.userRepository.findOneBy({
      email: createUserDto.email,
    });

    /// handle exception later on

    const newUser = this.userRepository.create(createUserDto);
    return await this.userRepository.save(newUser);
  }
}
