import { SetMetadata } from '@nestjs/common';
import { AuthType } from '../enums/auth.enum';
import { AUTH_KEY } from '../constants/constants';

export const Auth = (...args: AuthType[]) => SetMetadata(AUTH_KEY, args);
