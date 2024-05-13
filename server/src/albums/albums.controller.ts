import {
  Controller,
  Get,
  Param,
  HttpCode,
  Headers,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';

@Controller('albums')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @HttpCode(200)
  @Get()
  async getAllAlbums(@Headers('secret') secret: string) {
    if (secret == process.env.SECRET) {
      return this.albumsService.getAllAlbums();
    } else {
      throw new HttpException(
        'This is not open source data',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  @HttpCode(200)
  @Get(':id')
  async getAlbumsById(
    @Param('id') id: string,
    @Headers('secret') secret: string,
  ) {
    if (secret == process.env.SECRET) {
      return this.albumsService.getAlbumsById(id);
    } else {
      throw new HttpException(
        'This is not open source data',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  @HttpCode(200)
  @Get('name/:album')
  async getByAlbumName(
    @Param('album') albumName: string,
    @Headers('secret') secret: string,
  ) {
    if (secret == process.env.SECRET) {
      return this.albumsService.getByAlbumName(albumName);
    } else {
      throw new HttpException(
        'This is not open source data',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }
}
