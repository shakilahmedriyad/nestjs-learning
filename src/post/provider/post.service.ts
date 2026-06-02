import { Injectable } from '@nestjs/common';
import { PatchUserDto } from 'src/users/dto/patch-user.dto';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { Post } from '../post.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from 'src/meta-option/meta-option.entity';
import { UsersService } from 'src/users/providers/users.service';
import { TagService } from 'src/tags/provider/tags.service';

@Injectable()
export class PostService {
  constructor(
    /** inject user service to get user information for post creation and other operations */
    private readonly userService: UsersService,

    /** inject tag service to get tag information for post creation and other operations */
    private readonly tagService: TagService,

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

  public async getPosts() {
    const posts = await this.postRepository.find();
    return posts;
  }

  /**
   * Create a new post
   */

  public async createPost(createPostDto: CreatePostDto) {
    /** get the user by id from the user service */
    const user = await this.userService.getUserById(createPostDto.authorId);

    /** handle the case where the user is not found */
    if (user === null) {
      return { message: `User with ID ${createPostDto.authorId} not found.` };
    }

    /** get the tags by ids from the tag service */
    const tags = await this.tagService.getTagByIds(createPostDto.tags);

    /** create a new post using the post repository and save it to the database */
    const newPost = this.postRepository.create({
      ...createPostDto,
      author: user,
      tags: tags.tags,
    });

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
