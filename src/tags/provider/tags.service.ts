import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { Tag } from '../tags.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTagDto } from '../dto/create-tag.dto';

/**
 * The `TagsService` class provides methods for managing tags in the application.
 * It is decorated with the `@Injectable()` decorator, which allows it to be
 * injected as a dependency into other classes, such as controllers.
 */

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  /**   * Creates a new tag using the provided `CreateTagDto` data transfer object.
   * It uses the `tagRepository` to create and save the new tag in the database.
   *
   * @param createTagDto - The data transfer object containing the information needed to create a new tag.
   * @returns An object containing the created tag.
   */
  public async createTag(createTagDto: CreateTagDto) {
    const tag = this.tagRepository.create(createTagDto);

    await this.tagRepository.save(tag);

    return { tag };
  }

  public async getTagByIds(ids: number[] | undefined) {
    if (!ids || ids.length === 0) {
      return { tags: [] };
    }

    const tags = await this.tagRepository.findBy({
      id: In(ids),
    });
    return { tags };
  }
}
