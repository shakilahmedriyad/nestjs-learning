import { Injectable } from '@nestjs/common';
import { MetaOption } from '../meta-option.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostMetaOptionDto } from '../dto/create-post-meta-option.dto';

/**
 * Service for managing meta options.
 */

@Injectable()
export class MetaOptionService {
  constructor(
    @InjectRepository(MetaOption)
    private readonly metaOptionRepository: Repository<MetaOption>,
  ) {}

  /**
   * Creates a new meta option.
   * @param createMetaOptionDto - The data transfer object containing the meta option details.
   * @returns The created meta option.
   */

  public async createMetaOption(createMetaOptionDto: CreatePostMetaOptionDto) {
    const metaOption = this.metaOptionRepository.create(createMetaOptionDto);
    return await this.metaOptionRepository.save(metaOption);
  }
}
