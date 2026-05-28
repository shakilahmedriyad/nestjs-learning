import { Injectable } from '@nestjs/common';
import { PatchUserDto } from 'src/users/dto/patch-user.dto';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { Post } from '../post.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}
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

  /**
   * Create a new post
   */

  public createPost(createPostDto: CreatePostDto) {
    const newPost = this.postRepository.create(createPostDto);
  }

  public updatePost(updatePostDto: UpdatePostDto) {
    return {
      ...updatePostDto,
    };
  }
}
