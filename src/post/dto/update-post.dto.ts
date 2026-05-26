import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreatePostDto } from './create-post.dto';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @ApiProperty({
    description: 'The unique identifier of the post',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
