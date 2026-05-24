import { Injectable } from '@nestjs/common';
import { PatchUserDto } from 'src/users/dto/patch-user.dto';

@Injectable()
export class PostService {
  public getPosts(user: PatchUserDto) {
    return [
      {
        user,
        id: 1,
        title: 'First Post',
        content: 'This is the first post',
      },
      {
        user,
        id: 2,
        title: 'Second Post',
        content: 'This is the second post',
      },
    ];
  }
}
