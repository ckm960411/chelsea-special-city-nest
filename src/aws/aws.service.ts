import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';

@Injectable()
export class AwsService {
  private readonly bucketName: string;
  private readonly s3: S3;

  constructor(private configService: ConfigService) {
    this.bucketName = this.configService.get<string>('AWS_BUCKET');
    this.s3 = new S3({
      region: this.configService.get<string>('AWS_REGION'),
      accessKeyId: this.configService.get('AWS_ACCESS_KEY'),
      secretAccessKey: this.configService.get('AWS_SECRET_KEY'),
    });
  }

  async createPresigned(key: string) {
    return this.s3.createPresignedPost({
      Bucket: this.bucketName,
      Fields: { key },
      Conditions: [
        ['content-length-range', 0, 50 * 1000 * 1000],
        ['starts-with', '$Content-Type', 'image/'],
      ],
    });
  }
}
