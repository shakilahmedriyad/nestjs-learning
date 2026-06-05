import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthType } from 'src/auth/enums/auth.enum';
import { AuthGuard } from '../auth.guard';
import { AUTH_KEY } from 'src/auth/constants/constants';
import { NoAuthGuard } from '../no-auth/no-auth.guard';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  private static readonly defaultAuthType: AuthType = AuthType.BEARER;

  private readonly mapAuthTypeToGuard: Record<AuthType, CanActivate>;

  constructor(
    /**
     * we need to inject the Reflector here, as we will need to use it to get the metadata that is set by the @Auth decorator.
     */
    private readonly reflactor: Reflector,
    /**
     * we also need to inject the AuthGuard here, as we will need to use it to verify the token that is sent in the request.
     */

    private readonly authGuard: AuthGuard,

    private readonly noAuthGuard: NoAuthGuard,
  ) {
    this.mapAuthTypeToGuard = {
      [AuthType.BEARER]: this.authGuard,
      [AuthType.NONE]: this.noAuthGuard,
    };
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const authTypes = this.reflactor.getAllAndOverride<AuthType[]>(AUTH_KEY, [
      context.getHandler(),
      context.getClass(),
    ]) || [AuthenticationGuard.defaultAuthType];

    const authMode = authTypes.map((auth) => this.mapAuthTypeToGuard[auth]);

    for (const guard of authMode) {
      try {
        if (await guard.canActivate(context)) {
          return true;
        }
      } catch (error) {
        throw new UnauthorizedException();
      }
    }

    throw new UnauthorizedException();
  }
}
