import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { usersService } from './users.service';

@Controller()
export class usersController {
  constructor(private readonly userService: usersService) {}
  @Get('/users')
  public getUsers() {
    return 'all the users';
  }

  @Get('/users/:id')
  public getUserById(
    @Param('id', ParseIntPipe) id: number,
    @Query() query: Record<string, any>,
  ): string {
    const { name, age } = query;

    return this.userService.getUser(name, age, id);
  }

  @Post('/user')
  public saveUser(@Body() body: any) {
    const { name, age, email, mobile } = body;
    console.log(name, age, email, mobile);
    return 'ok your data will be saved no worries !!!!!';
  }

  @Patch('/user')
  public updateUser(@Body() body: any) {
    const { name, age, email, mobile } = body;
    console.log(name, age, email, mobile);
    return 'ok your data will be updated no worries !!!!!';
  }
}
