import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { usersService } from './providers/users.service';
import { SaveUserDto } from './dto/save-user.dto';
import { GetUserByIdDto } from './dto/get-userby-id.dto';
import { PatchUserDto } from './dto/patch-user.dto';

@Controller('/user')
export class usersController {
  constructor(private readonly userService: usersService) {}
  @Get()
  public getUsers() {
    return 'all the users';
  }

  @Get('/:id')
  public getUserById(
    @Param() getUserByIdDto: GetUserByIdDto,
    @Query() query: Record<string, any>,
  ): string {
    const { name, age } = query;

    return this.userService.getUser(name, age, getUserByIdDto.id);
  }

  @Post()
  public saveUser(@Body() saveUserDto: SaveUserDto) {
    console.log(saveUserDto);
    return 'ok your data will be saved no worries !!!!!';
  }

  @Patch()
  public updateUser(@Body() patchUserDto: PatchUserDto) {
    console.log(patchUserDto);
    return 'ok your data will be updated no worries !!!!!';
  }
}
