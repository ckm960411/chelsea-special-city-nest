import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PlayersService } from './players.service';

@Controller('players')
export class PlayersController {
  constructor(private playersService: PlayersService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('files'))
  async uploadPlayerImage(@UploadedFiles() files) {
    return this.playersService.uploadPlayerImages(files);
  }
}
