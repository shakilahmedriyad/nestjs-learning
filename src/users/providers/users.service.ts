import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  getUserById(id: number) {
    return {
      id,
      name: 'John Doe',
      age: 30,
    };
  }
}
