import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PostService } from './provider/post.service';
import { UsersService } from 'src/users/providers/users.service';
import { CreatePostDto } from './dto/create-post.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly userService: UsersService,
  ) {}

  @Get(':user_id')
  public getPosts(@Param('user_id') userId: number) {
    const user = this.userService.getUserById(Number(userId));
    return this.postService.getPosts(user);
  }

  @ApiResponse({
    status: 201,
    description: 'The post has been successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request.',
  })
  @Post()
  public createPost(@Body() createPostDto: CreatePostDto) {
    return this.postService.createPost(createPostDto);
  }
}
