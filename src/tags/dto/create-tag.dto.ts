import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsJSON,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateTagDto {
  @ApiProperty({
    description: 'The name of the tag',
    example: 'technology',
  })
  @IsString()
  @MinLength(3)
  @MaxLength(256)
  name: string;

  @ApiPropertyOptional({
    description: 'The schema of the tag',
    example: '{"type": "object", "properties": {"field1": {"type": "string"}}}',
  })
  @IsJSON()
  @IsOptional()
  schema?: string;

  @ApiPropertyOptional({
    description: 'The description of the tag',
    example: 'A tag for technology-related posts',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'The slug of the tag',
    example: 'technology',
  })
  @IsString()
  @MinLength(3)
  @MaxLength(512)
  slug: string;

  @ApiPropertyOptional({
    description: 'The URL of the featured image for the tag',
    example: 'https://example.com/images/technology.jpg',
  })
  @IsUrl()
  @IsOptional()
  featuredImageUrl?: string;
}
