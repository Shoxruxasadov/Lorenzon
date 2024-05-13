import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Headers,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import { PlaylistsDto } from './dto/playlists.dto';
import { SongDto } from './dto/song.dto';

@Controller('playlists')
export class PlaylistsController {
  constructor(private readonly playlistsService: PlaylistsService) {}

  @HttpCode(200)
  @Get()
  async getAllPlaylists(@Headers('secret') secret: string) {
    if (secret == process.env.SECRET) {
      return this.playlistsService.getAllPlaylists();
    } else {
      throw new HttpException(
        'This is not open source data',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  @HttpCode(200)
  @Get(':id')
  async getPlaylistById(
    @Param('id') id: string,
    @Headers('secret') secret: string,
  ) {
    if (secret == process.env.SECRET) {
      return this.playlistsService.getPlaylistById(id);
    } else {
      throw new HttpException(
        'This is not open source data',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  @HttpCode(200)
  @Get('name/:playlist')
  async getByPlaylistName(
    @Param('playlist') playlistName: string,
    @Headers('secret') secret: string,
  ) {
    if (secret == process.env.SECRET) {
      return this.playlistsService.getByPlaylistName(playlistName);
    } else {
      throw new HttpException(
        'This is not open source data',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  @HttpCode(201)
  @Post()
  async create(@Body() dto: PlaylistsDto, @Headers('secret') secret: string) {
    if (secret == process.env.SECRET) {
      return this.playlistsService.create(dto);
    } else {
      throw new HttpException(
        'This is not open source data',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  @HttpCode(200)
  @Patch('song/:playlistId')
  async addSong(
    @Param('playlistId') playlistId: string,
    @Body() dto: SongDto,
    @Headers('secret') secret: string,
  ) {
    if (secret == process.env.SECRET) {
      return this.playlistsService.addSong(playlistId, dto.id);
    } else {
      throw new HttpException(
        'This is not open source data',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  @HttpCode(200)
  @Delete('song/:playlistId')
  async removeSong(
    @Param('playlistId') playlistId: string,
    @Headers('song-id') songId: string,
    @Headers('secret') secret: string,
  ) {
    if (secret == process.env.SECRET) {
      return this.playlistsService.removeSong(playlistId, songId);
    } else {
      throw new HttpException(
        'This is not open source data',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  @HttpCode(200)
  @Patch('subscriber/:playlistId')
  async addSubscriber(
    @Param('playlistId') playlistId: string,
    @Body() dto: SongDto,
    @Headers('secret') secret: string,
  ) {
    if (secret == process.env.SECRET) {
      return this.playlistsService.addSubscriber(playlistId, dto.id);
    } else {
      throw new HttpException(
        'This is not open source data',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  @HttpCode(200)
  @Delete('subscriber/:playlistId')
  async removeSubscriber(
    @Param('playlistId') playlistId: string,
    @Headers('user-id') userId: string,
    @Headers('secret') secret: string,
  ) {
    if (secret == process.env.SECRET) {
      return this.playlistsService.removeSubscriber(playlistId, userId);
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
      return this.playlistsService.delete(id);
    } else {
      throw new HttpException(
        'This is not open source data',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }
}
