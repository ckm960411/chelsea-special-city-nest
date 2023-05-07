import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get<ConfigService>(ConfigService);

  const PORT = configService.get<string>('PORT');

  await app.listen(PORT, () => {
    console.log(`app is listening at ${PORT}`);
  });
}
bootstrap();
