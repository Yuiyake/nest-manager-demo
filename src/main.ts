import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // 静态资源配置
  app.useStaticAssets(join(__dirname, '../public/', 'static'), {
    prefix: '/static/',
  });
  // 设置全局路由前缀为/api/  -->所有接口前都要加这个前缀
  app.setGlobalPrefix('api');
  await app.listen(3030);
  console.log('启动成功! http://localhost:3030/');
}
bootstrap();
