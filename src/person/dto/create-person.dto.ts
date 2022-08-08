import { ApiProperty } from '@nestjs/swagger';
export class CreatePersonDto {
  @ApiProperty({ description: '文章标题' })
  readonly title: string;
  @ApiProperty({ description: '作者' })
  readonly author: string;
  @ApiProperty({ description: '内容' })
  readonly content: string;
  @ApiProperty({ description: '文章封面' })
  readonly cover_url: string;
  @ApiProperty({ description: '文章类型' })
  readonly type: number;
}
