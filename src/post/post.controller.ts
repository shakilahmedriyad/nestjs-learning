import { Controller, Get, Param } from '@nestjs/common';
import { PostService } from './provider/post.service';
import { UsersService } from 'src/users/providers/users.service';

@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly userService: UsersService,
  ) {}

  @Get('/:user_id')
  public getPosts(@Param('user_id') userId: number) {
    const user = this.userService.getUserById(Number(userId));
    return this.postService.getPosts(user);
  }
}
