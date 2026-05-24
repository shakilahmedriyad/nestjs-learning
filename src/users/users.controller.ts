import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './providers/users.service';
import { SaveUserDto } from './dto/save-user.dto';
import { GetUserByIdDto } from './dto/get-userby-id.dto';
import { PatchUserDto } from './dto/patch-user.dto';
import { AuthService } from 'src/auth/provider/auth.service';

@Controller('/user')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {}
  @Get()
  public getUsers() {
    return this.userService.getUsers(this.authService);
  }

  @Get('/:id')
  public getUserById(
    @Param() getUserByIdDto: GetUserByIdDto,
    @Query() query: Record<string, any>,
  ): string {
    const { name, age } = query;

    return 'hello';
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
