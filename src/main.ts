import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/interceptors/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get<ConfigService>(ConfigService);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe()); // class-validator 를 전역으로 적용
  app.useGlobalFilters(new HttpExceptionFilter());

  // if (configService.get<string>('NODE_ENV') === 'dev') {
  //   app.enableCors();
  // } else {
  // app.enableCors({
  //   origin: ['https://첼시특별시.com'],
  //   credentials: true,
  // });
  // }
  app.enableCors({
    origin: true, // true: 전체 허용 / 개발이 끝나면 어떤 특정 url 에서 접근이 가능할지 써주어야 함
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('C.I.C')
    .setDescription('chelsea-special-city')
    .setVersion('1.0.0')
    .build();
  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document); // Swagger API 에 엔드포인트를 지정해줌

  const PORT = configService.get<string>('PORT');

  await app.listen(PORT, () => {
    console.log(`app is listening at ${PORT}`);
  });
}
bootstrap();
