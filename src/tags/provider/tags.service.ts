import { Injectable } from '@nestjs/common';

/**
 * The `TagsService` class provides methods for managing tags in the application.
 * It is decorated with the `@Injectable()` decorator, which allows it to be
 * injected as a dependency into other classes, such as controllers.
 */

@Injectable()
export class TagsService {
  public async createTag() {
    return { message: 'Tag created successfully' };
  }
}
