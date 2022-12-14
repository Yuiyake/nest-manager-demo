import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpExceptionFilter } from './core/filter/http-exception.filter';
import { TransformInterceptor } from './core/interceptor/transform.interceptor';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { LoggerMiddleware } from './middleware/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // 静态资源配置
  // app.useStaticAssets(join(__dirname, '../public/', 'static'), {
  //   prefix: '/static/',
  // });
  // 注册全局错误的过滤器
  // app.useGlobalFilters(new HttpExceptionFilter());
  // 全局注册拦截器
  app.useGlobalInterceptors(new TransformInterceptor());
  // 添加resful版本控制
  app.enableVersioning({
    type: VersioningType.URI,
  });
  // 设置全局路由前缀为/api/  -->所有接口前都要加这个前缀
  app.setGlobalPrefix('api');
  // 设置管道验证
  app.useGlobalPipes(new ValidationPipe());
  // 监听所有请求路由，并打印日志
  // app.use(LoggerMiddleware);
  // 设置swagger文档
  const config = new DocumentBuilder()
    .setTitle('管理后台')
    .setDescription('管理后台接口文档')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  await app.listen(3030);
  console.log('启动成功! http://localhost:3030/docs ');
}
bootstrap();
