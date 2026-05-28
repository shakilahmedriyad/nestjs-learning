import { ApiProperty } from '@nestjs/swagger';
import { IsJSON, IsNotEmpty } from 'class-validator';

export class CreatePostMetaOptionDto {
  @ApiProperty({
    description: 'The meta value as a JSON string',
    example: '{"key": "value"}',
  })
  @IsJSON()
  @IsNotEmpty()
  metaValue: string;
}
