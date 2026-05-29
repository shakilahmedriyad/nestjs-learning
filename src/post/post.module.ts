import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './provider/post.service';
import { UsersModule } from 'src/users/users.module';
import { Post } from './post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetaOptionModule } from 'src/meta-option/meta-option.module';
import { TagsModule } from 'src/tags/tags.module';

@Module({
  controllers: [PostController],
  providers: [PostService],
  imports: [
    UsersModule,
    MetaOptionModule,
    TagsModule,
    TypeOrmModule.forFeature([Post]),
  ],
})
export class PostModule {}
