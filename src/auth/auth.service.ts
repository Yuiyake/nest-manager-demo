import { UserService } from './../user/user.service';
import { Injectable, BadRequestException, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../user/entities/user.entity';
import { AccessTokenInfo, AccessConfig } from './auth.interface';
import { lastValueFrom, map, Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private httpService: HttpService,
  ) {}

  createToken(user: Partial<UserEntity>) {
    return this.jwtService.sign(user);
  }

  async login(user: Partial<UserEntity>) {
    const token = this.createToken({
      id: user.id,
      username: user.username,
      role: user.role,
    });
    return { token };
  }

  async getUser(user) {
    return await this.userService.findOne(user.id);
  }

  isExpires(access) {
    return Date.now() - access.getTime > access.expiresIn * 1000;
  }
}
