import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { REQUEST_USER_KEY } from '../constants/constants';
import { ActiveUserData } from '../interface/active-user-data.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
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
    try {
      const payload = await this.jwtService.verifyAsync<ActiveUserData>(token);
      /**
       * assign user to request body
       */
      request[REQUEST_USER_KEY] = payload;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }

    return Promise.resolve(true);
  }
}
