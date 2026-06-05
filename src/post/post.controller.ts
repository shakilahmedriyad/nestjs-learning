import {
  Body,
  Controller,
  Delete,
  Get,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './provider/post.service';
import { UsersService } from 'src/users/providers/users.service';
import { CreatePostDto } from './dto/create-post.dto';
import { ApiResponse } from '@nestjs/swagger';
import { UpdatePostDto } from './dto/update-post.dto';
import { GetPostPaginationDto } from './dto/get-post-pagination.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enums/auth.enum';

@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly userService: UsersService,
  ) {}

  @Auth(AuthType.NONE)
  @Get()
  public getPosts(@Query() getPostPaginationDto: GetPostPaginationDto) {
    return this.postService.getPosts(getPostPaginationDto);
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

  @Patch()
  public updatePost(@Body() updatePostDto: UpdatePostDto) {
    return this.postService.updatePost(updatePostDto);
  }
  @ApiResponse({
    status: 200,
    description: 'The post has been successfully deleted.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request.',
  })
  @Delete()
  public deletePost(@Query('id', ParseIntPipe) id: number) {
    return this.postService.deletePost(id);
  }
}
