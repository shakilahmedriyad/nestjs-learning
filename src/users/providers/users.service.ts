import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/provider/auth.service';

@Injectable()
export class UsersService {
  getUserById(id: number) {
    return {
      id,
      name: 'John Doe',
      age: 30,
    };
  }
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
}
