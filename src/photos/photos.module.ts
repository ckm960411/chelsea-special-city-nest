import { Module } from '@nestjs/common';
import { PhotosController } from './photos.controller';
import { PhotosService } from './photos.service';
import { AwsModule } from 'src/aws/aws.module';
import { AwsService } from 'src/aws/aws.service';

@Module({
  imports: [AwsModule],
  controllers: [PhotosController],
  providers: [PhotosService, AwsService],
})
export class PhotosModule {}
