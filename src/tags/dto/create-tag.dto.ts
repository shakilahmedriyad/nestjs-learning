import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

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
  schema?: string;

  @ApiPropertyOptional({
    description: 'The description of the tag',
    example: 'A tag for technology-related posts',
  })
  description?: string;

  @ApiProperty({
    description: 'The slug of the tag',
    example: 'technology',
  })
  slug: string;
}
