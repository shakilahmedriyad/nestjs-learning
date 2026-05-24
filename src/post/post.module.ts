import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './provider/post.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [PostController],
  providers: [PostService],
  imports: [UsersModule],
})
export class PostModule {}
