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

  public async createPost(createPostDto: CreatePostDto) {
    const newMetaOption = createPostDto.metaOptions
      ? this.metaOptionRepository.create(createPostDto.metaOptions)
      : null;

    const newPost = this.postRepository.create(createPostDto);

    /**
     * if meta options are provided, save them first and then associate with the post before saving the post.
     *  */
    if (newMetaOption) {
      await this.metaOptionRepository.save(newMetaOption);
      newPost.metaOptions = newMetaOption;
    }

    return await this.postRepository.save(newPost);
  }

  public updatePost(updatePostDto: UpdatePostDto) {
    return {
      ...updatePostDto,
    };
  }
}
