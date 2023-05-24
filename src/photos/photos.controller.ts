import { Body, Controller, Post } from '@nestjs/common';
import { Public } from 'src/auth/decorators/public.decorator';
import { CreatePrisignedDto } from './dto/create-presigned.dto';
import { PhotosService } from './photos.service';

@Controller('photos')
export class PhotosController {
  constructor(private photosService: PhotosService) {}

  @Post('presigned')
  @Public()
  async createPresigned(@Body() { fileTypes }: CreatePrisignedDto) {
    return this.photosService.createPresigned(fileTypes);
  }
}
