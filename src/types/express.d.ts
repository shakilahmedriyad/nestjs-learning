import { ActiveUserData } from '../auth/interfaces/active-user-data.interface';

declare global {
  namespace Express {
    interface Request {
      user: ActiveUserData;
    }
  }
}

export {};
