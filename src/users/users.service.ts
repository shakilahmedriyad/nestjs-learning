import { Injectable } from '@nestjs/common';

@Injectable()
export class usersService {
  getUser(name: string, age: number, id: number) {
    return 'User Id = ' + id + ' User name = ' + name + ' User age = ' + age;
  }
}
