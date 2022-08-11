import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ClassSerializerInterceptor,
  UseInterceptors,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserInfoDto } from './dto/user-info.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller({
  path: 'user',
  version: '1',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '注册用户' })
  @UseInterceptors(ClassSerializerInterceptor) // 配合Entity里的Exclude做反序列化，所有返回的接口都会隐藏password字段
  @Post('register')
  create(@Body() createUser: CreateUserDto) {
    return this.userService.register(createUser);
  }

  @Get()
  findAll() {
    return 'get findAll';
  }

  @ApiOperation({ summary: '获取用户信息' })
  @ApiBearerAuth() // swagger文档设置token
  @UseGuards(AuthGuard('jwt'))
  @Get()
  getUserInfo(@Req() req) {
    return req.user;
  }

  @ApiOperation({ summary: '获取指定id用户' })
  @Get(':id')
  findOne(@Param('id') id) {
    return this.userService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
