import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class GetUserByIdDto {
  @ApiPropertyOptional({
    description: 'The ID of the user to retrieve',
    example: 1,
  })
  @IsOptional()
  @Type(() => Number)
  id: number;
}
