import {
  BadRequestException,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { Post } from '../post.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from 'src/meta-option/meta-option.entity';
import { UsersService } from 'src/users/providers/users.service';
import { TagService } from 'src/tags/provider/tags.service';
import { GetPostPaginationDto } from '../dto/get-post-pagination.dto';
import { PaginationService } from 'src/common/pagination/provider/pagination.service';
import type { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import { User } from 'src/users/user.entity';
import { Tag } from 'src/tags/tags.entity';

@Injectable()
export class PostService {
  constructor(
    /** inject user service to get user information for post creation and other operations */
    private readonly userService: UsersService,

    /** inject tag service to get tag information for post creation and other operations */
    private readonly tagService: TagService,

    /**
     * injecting pagination service to perform pagination operations on post entity
     */
    private readonly paginationService: PaginationService,

    @Inject(REQUEST)
    private readonly request: Request,

    /** inject post repository to perform database operations on post entity */
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,

    /** inject meta option repository to perform database operations on meta option entity */
    @InjectRepository(MetaOption)
    private readonly metaOptionRepository: Repository<MetaOption>,
  ) {}

  /**
   * * Get all posts
   */

  public async getPosts(getPostPaginationDto: GetPostPaginationDto) {
    const user = this.request['user'];
    const posts = await this.paginationService.PaginateQuery(
      getPostPaginationDto,
      this.postRepository,
    );
    return posts;
  }

  /**
   * Create a new post
   */

  public async createPost(createPostDto: CreatePostDto, sub: number) {
    let user: User | null;
    let tags: Tag[];

    try {
      /** get the user by id from the user service */
      user = await this.userService.getUserById(sub);

      /** handle the case where the user is not found */
      if (user === null) {
        return { message: `User with ID ${sub} not found.` };
      }

      /** get the tags by ids from the tag service */

      tags = await this.tagService.getTagByIds(createPostDto.tags);
    } catch (error) {
      throw new RequestTimeoutException();
    }

    let newPost: Post;

    try {
      /** create a new post using the post repository and save it to the database */
      newPost = this.postRepository.create({
        ...createPostDto,
        author: user,
        tags,
      });
    } catch (error) {
      throw new BadRequestException('Email already exist');
    }

    try {
      newPost = await this.postRepository.save(newPost);
    } catch (error) {
      throw new RequestTimeoutException();
    }

    return newPost;
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
