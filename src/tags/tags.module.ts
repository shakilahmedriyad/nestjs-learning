import { Module } from '@nestjs/common';
import { TagsController } from './tags.controller';
import { TagService } from './provider/tags.service';
import { Tag } from './tags.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [TagsController],
  providers: [TagService],
  imports: [TypeOrmModule.forFeature([Tag])],
})
export class TagsModule {}
