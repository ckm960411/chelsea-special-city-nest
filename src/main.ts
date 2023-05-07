import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get<ConfigService>(ConfigService);

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
