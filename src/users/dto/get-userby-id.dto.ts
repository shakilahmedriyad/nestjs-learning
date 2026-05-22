import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class GetUserByIdDto {
  @IsOptional()
  @Type(() => Number)
  id: number;
}
