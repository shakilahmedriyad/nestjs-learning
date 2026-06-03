import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/providers/users.service';
import { HashingProvider } from './hashing.provider';
import { SignInDto } from '../dtos/sign-in.dto';

@Injectable()
export class SignInProvider {
  constructor(
    /**  Inject the UsersService to use its user management capabilities */
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,

    /**  Inject the JwtService to use its signing capabilities */
    private readonly hashingProvider: HashingProvider,

    /**  Inject the JwtService to use its signing capabilities */
    private readonly jwtService: JwtService,

    /**  inject ConfigModule repository here */
  ) {}

  /**
   *
   */
  public async signIn(signInDto: SignInDto) {
    /** fetch user by email
     * handle the case where the user is not found by email, throw an UnauthorizedException
     */
    const user = await this.userService.getUserByEmail(signInDto.email);

    /** compare the password with the hash stored in the database using the HashingProvider's compare method, if the password is invalid, throw an UnauthorizedException */
    let isPasswordValid: boolean;
    try {
      isPasswordValid = await this.hashingProvider.compare(
        signInDto.password,
        user.password,
      );
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    /** if the password is valid, sign a JWT token using the JwtService's sign method, and return the token */
    const payload = { email: user.email, sub: user.id };
    const token = this.jwtService.sign(payload);
    return { token };
  }
}
