import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PersonService, PersonRo } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';

@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Post()
  create(@Body() post) {
    return this.personService.create(post);
  }

  @Get()
  findAll(@Query() query): Promise<PersonRo> {
    return this.personService.findAll(query);
  }

  // query形式数据接口（跟在url里?后面那一串）
  @Get('find')
  query(@Query('name') name: string, @Query('age') age: number) {
    return this.personService.queryOne(name, age);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personService.findOne(+id);
  }

  @Get(':id')
  async findById(@Param('id') id) {
    return await this.personService.findById(id);
  }

  @Put(':id')
  async update(@Param('id') id, @Body() post) {
    return await this.personService.updateById(id, post);
  }

  @Delete('id')
  remove(@Param('id') id) {
    return this.personService.remove(id);
  }
}
