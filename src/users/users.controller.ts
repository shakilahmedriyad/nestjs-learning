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
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserByIdDto } from './dto/get-userby-id.dto';
import { PatchUserDto } from './dto/patch-user.dto';
import { AuthService } from 'src/auth/provider/auth.service';
import { ApiResponse } from '@nestjs/swagger';

@Controller('/user')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @ApiResponse({
    status: 200,
    description: 'The user has been successfully retrieved.',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden.',
  })
  @Get()
  public getUsers() {
    return this.userService.getUsers(this.authService);
  }

  @ApiResponse({
    status: 200,
    description: 'The user has been successfully retrieved.',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden.',
  })
  @Get('/:id')
  public getUserById(
    @Param() getUserByIdDto: GetUserByIdDto,
    @Query() query: Record<string, any>,
  ): string {
    const { name, age } = query;

    return 'hello';
  }

  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request.',
  })

  /**
   * Create a new user
   */
  @Post()
  public saveUser(@Body() saveUserDto: CreateUserDto) {
    return this.userService.createUser(saveUserDto);
  }

  @ApiResponse({
    status: 200,
    description: 'The user has been successfully updated.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request.',
  })
  @Patch()
  public updateUser(@Body() patchUserDto: PatchUserDto) {
    console.log(patchUserDto);
    return 'ok your data will be updated no worries !!!!!';
  }
}
