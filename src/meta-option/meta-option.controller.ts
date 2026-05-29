import { Body, Controller, Post } from '@nestjs/common';
import { MetaOptionService } from './provider/meta-option.service';
import { CreatePostMetaOptionDto } from './dto/create-post-meta-option.dto';

@Controller('meta-option')
export class MetaOptionController {
  constructor(private readonly metaOptionService: MetaOptionService) {}

  @Post()
  public async createMetaOption(
    @Body() createMetaOptionDto: CreatePostMetaOptionDto,
  ) {
    return this.metaOptionService.createMetaOption(createMetaOptionDto);
  }
}
