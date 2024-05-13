import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { SongsDto } from './dto/songs.dto';

@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @HttpCode(200)
  @Get()
  async getAllSongs(@Headers('secret') secret: string) {
    if (secret == process.env.SECRET) {
      return this.songsService.getAllSongs();
    } else {
      throw new HttpException(
        'This is not open source data',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  @HttpCode(200)
  @Get('random')
  async getRandomSongs(@Headers('secret') secret: string) {
    if (secret == process.env.SECRET) {
      return this.songsService.getRandomSongs();
    } else {
      throw new HttpException(
        'This is not open source data',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  @HttpCode(201)
  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() dto: SongsDto, @Headers('secret') secret: string) {
    if (secret == process.env.SECRET) {
      return this.songsService.create(dto);
    } else {
      throw new HttpException(
        'This is not open source data',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  @HttpCode(200)
  @Delete(':id')
  async delete(@Param('id') id: string, @Headers('secret') secret: string) {
    if (secret == process.env.SECRET) {
      return this.songsService.delete(id);
    } else {
      throw new HttpException(
        'This is not open source data',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }
}
