import {
  BadRequestException,
  Inject,
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/provider/auth.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CreateUserProvider {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    /**  Inject the AuthService to use its hashing capabilities */
    private readonly authService: AuthService,
    /**  Inject the JwtService to use its signing capabilities */
    private readonly jwtService: JwtService,

    /**  inject ConfigModule repository here */
    private readonly configService: ConfigService,
  ) {
    // inject user repository here
  }

  /**
   * Create a new user
   */
  public async createUser(createUserDto: CreateUserDto) {
    /**
     * checking if the user already exists by email, if it does, throw a BadRequestException
     *
     */
    let user: User | null;
    try {
      user = await this.userRepository.findOneBy({
        email: createUserDto.email,
      });
    } catch (error) {
      console.error('Error creating user:', error);
      throw new RequestTimeoutException();
    }

    if (user) {
      throw new BadRequestException('User already exists');
    }

    /**
     * create a new user using the user repository, but before saving the user, hash the password using the AuthService's hashing capabilities
     *
     */
    let newUser: User;
    try {
      newUser = this.userRepository.create({
        ...createUserDto,
        password: await this.authService.hashPassword(createUserDto.password),
      });

      await this.userRepository.save(newUser);
    } catch (error) {
      throw new RequestTimeoutException();
    }

    /** Sending JWT token */

    try {
      const payload = { email: newUser.email, sub: newUser.id };
      const token = this.jwtService.sign(payload);

      return { token };
    } catch (error) {
      console.error('Error signing JWT token:', error);
      throw new UnauthorizedException();
    }
  }
}
