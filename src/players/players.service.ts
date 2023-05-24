import { Injectable } from '@nestjs/common';
import { UploadedFiles } from '@nestjs/common';

@Injectable()
export class PlayersService {
  async uploadPlayerImages(files: typeof UploadedFiles) {}
}
