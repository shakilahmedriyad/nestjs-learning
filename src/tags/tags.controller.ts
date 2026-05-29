import { Controller, Post } from '@nestjs/common';
import { TagsService } from './provider/tags.service';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  public async createTag() {
    return this.tagsService.createTag();
  }
}
