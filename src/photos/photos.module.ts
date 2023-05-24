import { Module } from '@nestjs/common';
import { PhotosController } from './photos.controller';
import { PhotosService } from './photos.service';
import { AwsModule } from 'src/aws/aws.module';

@Module({
  controllers: [PhotosController, AwsModule],
  providers: [PhotosService],
})
export class PhotosModule {}
