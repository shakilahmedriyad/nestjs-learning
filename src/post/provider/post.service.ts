import { Injectable } from '@nestjs/common';
import { PatchUserDto } from 'src/users/dto/patch-user.dto';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { Post } from '../post.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from 'src/meta-option/meta-option.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(MetaOption)
    private readonly metaOptionRepository: Repository<MetaOption>,
  ) {}
  public async getPosts(user: PatchUserDto) {
    const posts = await this.postRepository.find();
    return posts;
  }

  /**
   * Create a new post
   */

  public async createPost(createPostDto: CreatePostDto) {
    const newPost = this.postRepository.create(createPostDto);
    return await this.postRepository.save(newPost);
  }

  /**
   * Update an existing post
   */
  public updatePost(updatePostDto: UpdatePostDto) {
    return {
      ...updatePostDto,
    };
  }

  /**
   * Delete a post by ID
   */
  public async deletePost(id: number) {
    await this.postRepository.delete(id);
    return { message: `Post with ID ${id} has been deleted.` };
  }
}
