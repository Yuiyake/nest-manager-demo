import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreatePersonDto {
  @IsNotEmpty({ message: '文章标题必填' })
  @ApiProperty({ description: '文章标题' })
  readonly title: string;

  @IsNotEmpty({ message: '缺少作者信息' })
  @ApiProperty({ description: '作者' })
  readonly author: string;

  @ApiPropertyOptional({ description: '内容' })
  readonly content: string;

  @ApiPropertyOptional({ description: '文章封面' })
  readonly cover_url: string;

  // @IsNumber()
  @ApiProperty({ description: '文章类型' })
  readonly type: number;
}
