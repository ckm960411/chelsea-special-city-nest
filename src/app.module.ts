import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { PlayersModule } from './players/players.module';
import { CommentsModule } from './comments/comments.module';
import { StatsModule } from './stats/stats.module';
import { AwsModule } from './aws/aws.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        database: configService.get<string>('DB_DATABASE'),
        password: configService.get<string>('DB_PASSWORD'),
        entities: [__dirname + '/**/*.entity.{js,ts}'],
        synchronize: true, // 개발환경에선 true, production 에선 false
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    PlayersModule,
    CommentsModule,
    StatsModule,
    AwsModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
