import { Injectable } from '@nestjs/common';
import { AwsService } from 'src/aws/aws.service';
import * as mime from 'mime';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PhotosService {
  constructor(private readonly awsService: AwsService) {}

  async createPresigned(fileTypes: string[]) {
    return Promise.all(
      fileTypes.map(async (fileType) => {
        const fileExtension = mime.extension(fileType);
        const imageKey = `${uuidv4()}.${fileExtension}`;
        const key = `photos/${imageKey}`;
        const presigned = await this.awsService.createPresigned(key);
        return { imageKey, presigned };
      }),
    );
  }
}
