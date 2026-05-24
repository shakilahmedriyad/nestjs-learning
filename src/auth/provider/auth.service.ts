import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  public isAuth(id: number) {
    return {
      id,
      name: 'John Doe',
      age: 30,
      auth: true,
    };
  }
}
