import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsPositive } from 'class-validator';

export class GetPaginationDto {
  /** The page number to retrieve, default is 1 */
  @ApiPropertyOptional({
    description: 'The page number to retrieve',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @IsPositive()
  page: number = 1;

  /** The number of items per page, default is 10 */
  @ApiPropertyOptional({
    description: 'The number of items per page',
    example: 10,
    required: false,
  })
  @IsOptional()
  @IsPositive()
  @IsInt()
  limit: number = 10;
}
