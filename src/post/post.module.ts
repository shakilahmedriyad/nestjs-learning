import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './provider/post.service';
import { UsersModule } from 'src/users/users.module';
import { Post } from './post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetaOptionModule } from 'src/meta-option/meta-option.module';
import { TagsModule } from 'src/tags/tags.module';
import { MetaOption } from 'src/meta-option/meta-option.entity';

@Module({
  controllers: [PostController],
  providers: [PostService],
  imports: [
    UsersModule,
    MetaOptionModule,
    TagsModule,
    TypeOrmModule.forFeature([Post, MetaOption]),
  ],
})
export class PostModule {}
