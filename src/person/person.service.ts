import { Injectable, HttpException } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { PersonEntity } from './entities/person.entity';

export interface PersonRo {
  list: PersonEntity[];
  count: number;
}

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(PersonEntity)
    private readonly personRepository: Repository<PersonEntity>,
  ) {}
  // 创建文章
  async create(post: Partial<PersonEntity>): Promise<PersonEntity> {
    const { title } = post;
    if (!title) {
      throw new HttpException('缺少文章标题', 401);
    }
    const doc = await this.personRepository.findOne({ where: { title } });
    if (doc) {
      throw new HttpException('文章已存在', 401);
    }
    return await this.personRepository.save(post);
  }
  async findAll(query): Promise<PersonRo> {
    const qb = await getRepository(PersonEntity).createQueryBuilder('post');
    qb.where('1 = 1');
    qb.orderBy('post.create_time', 'DESC');
    const count = await qb.getCount();
    const { pageNum = 1, pageSize = 10, ...params } = query;
    qb.limit(pageSize);
    qb.offset(pageSize * (pageNum - 1));
    const posts = await qb.getMany();
    return { list: posts, count: count };
  }

  async findById(id): Promise<PersonEntity> {
    return await this.personRepository.findOne(id);
  }
  async updateById(id, post): Promise<PersonEntity> {
    const existPost = await this.personRepository.findOne(id);
    if (!existPost) {
      throw new HttpException(`id为${id}的文章不存在`, 401);
    }
    const updatePost = this.personRepository.merge(existPost, post);
    return this.personRepository.save(updatePost);
  }

  async remove(id) {
    const existPost = await this.personRepository.findOne(id);
    if (!existPost) {
      throw new HttpException(`id为${id}的文章不存在`, 401);
    }
    return await this.personRepository.remove(existPost);
  }

  // findOne(id: number) {
  //   return `param参数  ${id}`;
  // }

  // queryOne(name: string, age: number) {
  //   return `query参数  name:${name}, age:${age}`;
  // }
}
