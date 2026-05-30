import { Body, Controller, Post } from '@nestjs/common';
import { TagService } from './provider/tags.service';
import { CreateTagDto } from './dto/create-tag.dto';

@Controller('tag')
export class TagsController {
  constructor(private readonly tagService: TagService) {}

  /**
   * * Handles the HTTP POST request to create a new tag.
   */

  @Post()
  public async createTag(@Body() createTagDto: CreateTagDto) {
    return this.tagService.createTag(createTagDto);
  }
}
