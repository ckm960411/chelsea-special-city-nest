import { Module } from '@nestjs/common';
import { AwsService } from './aws.service';

@Module({
  providers: [AwsService],
  controllers: [],
  exports: [AwsService],
})
export class AwsModule {}
