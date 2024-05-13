import {
  Controller,
  Get,
  Param,
  HttpCode,
  Headers,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @HttpCode(200)
  @Get(':search')
  async getSearch(
    @Param('search') search: string,
    @Headers('secret') secret: string,
  ) {
    if (secret == process.env.SECRET) {
      return this.searchService.getSearch(search);
    } else {
      throw new HttpException(
        'This is not open source data',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  @HttpCode(200)
  @Get('songs/:search')
  async getSongs(
    @Param('search') search: string,
    @Headers('secret') secret: string,
  ) {
    if (secret == process.env.SECRET) {
      return this.searchService.getSongs(search);
    } else {
      throw new HttpException(
        'This is not open source data',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  @HttpCode(200)
  @Get('singers/:search')
  async getSingers(
    @Param('search') search: string,
    @Headers('secret') secret: string,
  ) {
    if (secret == process.env.SECRET) {
      return this.searchService.getSingers(search);
    } else {
      throw new HttpException(
        'This is not open source data',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  @HttpCode(200)
  @Get('albums/:search')
  async getAlbums(
    @Param('search') search: string,
    @Headers('secret') secret: string,
  ) {
    if (secret == process.env.SECRET) {
      return this.searchService.getAlbums(search);
    } else {
      throw new HttpException(
        'This is not open source data',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  @HttpCode(200)
  @Get('playlists/:search')
  async getPlaylists(
    @Param('search') search: string,
    @Headers('secret') secret: string,
  ) {
    if (secret == process.env.SECRET) {
      return this.searchService.getPlaylists(search);
    } else {
      throw new HttpException(
        'This is not open source data',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  @HttpCode(200)
  @Get('profiles/:search')
  async getProfiles(
    @Param('search') search: string,
    @Headers('secret') secret: string,
  ) {
    if (secret == process.env.SECRET) {
      return this.searchService.getProfiles(search);
    } else {
      throw new HttpException(
        'This is not open source data',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }
}
