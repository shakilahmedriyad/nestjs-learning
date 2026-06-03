import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/providers/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    /**
     * we need to inject the UsersService here, as we will need to use it to get the user from the database, based on the token that is sent in the request.
     */
    private readonly userService: UsersService,

    /**
     * we also need to inject the AuthService here, as we will need to use it to verify the token that is sent in the request.
     */
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const authHeader = request.headers['authorization'];
    /**
     * if no authorization header is present, we can immediately return false, as the user is not authenticated.
     *
     */
    if (!authHeader) {
      return Promise.resolve(false);
    }

    const token = authHeader.split(' ')[1];
    /**
     * if no token is present, we can immediately return false, as the user is not authenticated.
     *
     */
    if (!token) {
      throw new UnauthorizedException('No token provided');
    }
    let decodedToken;
    try {
      decodedToken = await this.jwtService.verify(token);
    } catch (error) {

      throw new UnauthorizedException('Invalid token');
    }
    if (!decodedToken) {
      throw new UnauthorizedException('Invalid token');
    }
    const email = decodedToken.email;

    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return Promise.resolve(true);
  }
}
