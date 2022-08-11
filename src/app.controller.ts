import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
  Req,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { UserEntity } from './user/entities/user.entity';
import { LoginDto } from './auth/dto/login.dto';

@ApiTags('本地验证')
@Controller('auth')
export class AppController {
  @UseGuards(AuthGuard('local'))
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('login')
  async login(@Body() UserEntity: LoginDto, @Req() req) {
    return req.user;
  }
  // constructor(private readonly appService: AppService) {}
}
