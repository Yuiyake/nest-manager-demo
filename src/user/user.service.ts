import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async register(createUser: CreateUserDto) {
    const { username } = createUser;
    const existUser = await this.userRepository.findOne({
      where: { username },
    });

    if (existUser) {
      throw new HttpException('用户名已存在', HttpStatus.BAD_REQUEST);
    }

    const newUser = await this.userRepository.create(createUser);
    return await this.userRepository.save(newUser); // 相当于new User(createUser)创建了一个新的用户对象
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(id: string): Promise<UserEntity> {
    return await this.userRepository.findOne(id);
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  // comparePassword(password, libPassword) {
  //   return compareSync(password, libPassword);
  // }
}
