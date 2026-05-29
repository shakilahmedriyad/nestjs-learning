import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsISO8601,
  IsJSON,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { statusType } from '../enums/statusType.enum';
import { PostType } from '../enums/postType.enum';
import { CreatePostMetaOptionDto } from '../../meta-option/dto/create-post-meta-option.dto';

export class CreatePostDto {
  @ApiProperty({
    description: 'The title of the post',
    example: 'My First Post',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(100)
  title: string;

  @ApiProperty({
    description: 'The type of the post',
    example: 'post',
  })
  @IsString()
  @IsEnum(PostType)
  @IsNotEmpty()
  postType: PostType;

  @ApiProperty({
    description: 'The slug of the post',
    example: 'my-first-post',
  })
  @IsString()
  @IsNotEmpty()
  slug: string;

  @ApiProperty({
    description: 'The status of the post',
    example: 'draft',
  })
  @IsString()
  @IsEnum(statusType)
  @IsNotEmpty()
  status: statusType;

  @ApiProperty({
    description: 'The content of the post',
    example: 'This is the content of my first post.',
  })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiProperty({
    description: 'The JSON schema for the post',
    example: '{"key": "value"}',
  })
  @IsString()
  @IsOptional()
  @IsJSON()
  schema?: string;

  @ApiProperty({
    description: 'The URL of the featured image',
    example: 'https://example.com/featured-image.jpg',
  })
  @IsUrl()
  @IsOptional()
  featuredImageUrl?: string;

  @ApiProperty({
    description: 'The date the post was published',
    example: '2023-01-01T00:00:00.000Z',
  })
  @IsISO8601()
  @IsOptional()
  publishedOn?: Date;

  @ApiProperty({
    description: 'The tags for the post',
    example: ['tag1', 'tag2'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  tags?: string[];

  @ApiProperty({
    description: 'The meta options for the post',
    example: {
      metaValue: '{"key": "value"}',
    },
  })
  @IsOptional()
  @IsObject()
  metaOptions?: CreatePostMetaOptionDto;
}
