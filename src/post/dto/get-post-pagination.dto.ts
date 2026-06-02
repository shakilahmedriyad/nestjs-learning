import { IntersectionType } from '@nestjs/swagger';
import { GetPaginationDto } from 'src/common/pagination/dto/get-pagination.dto';

export class GetPostPaginationDto extends IntersectionType(GetPaginationDto) {}
