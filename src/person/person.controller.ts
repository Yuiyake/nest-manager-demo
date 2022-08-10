import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  Version,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PersonService, PersonRo } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';

@ApiTags('文章')
@Controller({
  path: 'person',
  version: '1',
})
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Version('1')
  @ApiOperation({ summary: '创建文章' })
  @Post()
  create(@Body() post: CreatePersonDto) {
    return this.personService.create(post);
  }

  @Version('1')
  @ApiOperation({ summary: '获取全部文章' })
  @Get()
  async findAll(@Query() query): Promise<PersonRo> {
    return await this.personService.findAll(query);
  }

  // query形式数据接口（跟在url里?后面那一串）
  // @Get('find')
  // query(@Query('name') name: string, @Query('age') age: number) {
  //   return this.personService.queryOne(name, age);
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.personService.findOne(+id);
  // }

  @Version('1')
  @ApiOperation({ summary: '获取指定id文章' })
  @Get(':id')
  async findById(@Param('id') id) {
    return await this.personService.findById(id);
  }

  @Version('1')
  @ApiOperation({ summary: '更新指定id文章' })
  @Put(':id')
  async update(@Param('id') id, @Body() post) {
    return await this.personService.updateById(id, post);
  }

  @Version('1')
  @ApiOperation({ summary: '删除指定id文章' })
  @Delete('id')
  remove(@Param('id') id) {
    return this.personService.remove(id);
  }
}
