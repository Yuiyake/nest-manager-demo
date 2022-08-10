import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonModule } from './person/person.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { PersonEntity } from './person/entities/person.entity';
import { UserEntity } from './user/entities/user.entity';
import { UserModule } from './user/user.module';
import envConfig from '../config/env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 设为全局
      envFilePath: [envConfig.path],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        entities: [PersonEntity, UserEntity],
        host: configService.get('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_ROOT', 3306),
        username: configService.get('DB_USER', 'root'),
        password: configService.get('DB_PASSWORD', '123456'),
        database: configService.get('DB_DATABASE', 'nest_db'),
        timezone: '+08:00',
        synchronize: true,
      }),
    }),
    PersonModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
