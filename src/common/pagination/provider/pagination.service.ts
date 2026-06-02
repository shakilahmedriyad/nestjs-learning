import { Inject, Injectable } from '@nestjs/common';
import { GetPaginationDto } from '../dto/get-pagination.dto';
import { ObjectLiteral, Repository } from 'typeorm';
import { GetPaginationResponse } from '../interface/get-pagination-response.interface';
import type { Request } from 'express';
import { REQUEST } from '@nestjs/core';

@Injectable()
export class PaginationService {
  constructor(
    @Inject(REQUEST)
    private readonly request: Request,
  ) {}

  /**
   * Paginate a query using the provided pagination parameters and repository.
   * @param PaginateQueryDto - The pagination parameters (page and limit).
   * @param repository - The TypeORM repository to query.
   * @returns A promise that resolves to a GetPaginationResponse containing the paginated data and metadata.
   */

  public async PaginateQuery<T extends ObjectLiteral>(
    PaginateQueryDto: GetPaginationDto,
    repository: Repository<T>,
  ): Promise<GetPaginationResponse<T>> {
    const { page, limit } = PaginateQueryDto;
    const skip = (page - 1) * limit;
    const result = await repository.find({
      skip,
      take: limit,
    });

    const totalItems = await repository.count();
    const totalPages = Math.ceil(totalItems / limit);

    const baseUrl = `${this.request.protocol}://${this.request.get('host')}${this.request.path}`;

    const response: GetPaginationResponse<T> = {
      data: result,
      meta: {
        itemsPerPage: limit,
        totalItems,
        totalPages,
        currentPage: page,
      },
      links: {
        first: `${baseUrl}?page=1&limit=${limit}`,
        previous: `${baseUrl}?page=${Math.max(1, page - 1)}&limit=${limit}`,
        next: `${baseUrl}?page=${Math.min(totalPages, page + 1)}&limit=${limit}`,
        last: `${baseUrl}?page=${totalPages}&limit=${limit}`,
      },
    };

    return response;
  }
}
