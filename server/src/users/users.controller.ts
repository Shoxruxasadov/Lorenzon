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
  Patch,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LastedSongDto } from './dto/lastedSong.dto';
import { UsersService } from './users.service';
import { UsersDto } from './dto/users.dto';
import mongoose from 'mongoose';
import { UserIdDto } from './dto/userId.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(200)
  @Get()
  async getAllUser(@Headers('secret') secret: string) {
    if (secret == process.env.SECRET) {
      return this.usersService.getAllUser();
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
  async create(@Body() dto: UsersDto, @Headers('secret') secret: string) {
    if (secret == process.env.SECRET) {
      return this.usersService.create(dto);
    } else {
      throw new HttpException(
        'This is not open source data',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  @HttpCode(200)
  @Get(':id')
  async getById(@Param('id') id: string, @Headers('secret') secret: string) {
    if (secret == process.env.SECRET) {
      return this.usersService.getById(id);
    } else {
      throw new HttpException(
        'This is not open source data',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  @HttpCode(200)
  @Get('singers/:get')
  async getAllSingers(@Headers('secret') secret: string) {
    if (secret == process.env.SECRET) {
      return this.usersService.getAllSingers();
    } else {
      throw new HttpException(
        'This is not open source data',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  @HttpCode(200)
  @Get('singer/:singer')
  async getBySingerName(
    @Param('singer') singerName: string,
    @Headers('secret') secret: string,
  ) {
    if (secret == process.env.SECRET) {
      return this.usersService.getBySingerName(singerName);
    } else {
      throw new HttpException(
        'This is not open source data',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  @HttpCode(200)
  @Get('username/:username')
  async getByUsername(
    @Param('username') username: string,
    @Headers('secret') secret: string,
  ) {
    if (secret == process.env.SECRET) {
      return this.usersService.getByUsername(username);
    } else {
      throw new HttpException(
        'This is not open source data',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  @HttpCode(200)
  @Get('email/:email')
  async getByEmail(
    @Param('email') email: string,
    @Headers('secret') secret: string,
  ) {
    if (secret == process.env.SECRET) {
      return this.usersService.getByEmail(email);
    } else {
      throw new HttpException(
        'This is not open source data',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  @HttpCode(200)
  @Put(':id')
  @UsePipes(ValidationPipe)
  async update(
    @Param('id') id: string,
    @Body() dto: UsersDto,
    @Headers('secret') secret: string,
  ) {
    if (secret == process.env.SECRET) {
      if (dto.recently) dto.recently = dto.recently.map((songId) => new mongoose.Types.ObjectId(songId));
      await this.usersService.update(id, dto);
      return 'Success updated';
    } else {
      throw new HttpException(
        'This is not open source data',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  @HttpCode(200)
  @Patch('song/:id')
  @UsePipes(ValidationPipe)
  async lastSongPatch(
    @Param('id') id: string,
    @Body() dto: LastedSongDto,
    @Headers('secret') secret: string,
  ) {
    if (secret == process.env.SECRET) {
      return this.usersService.lastSongPatch(id, dto.id);
    } else {
      throw new HttpException(
        'This is not open source data',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  @HttpCode(200)
  @Patch('premium/:id')
  @UsePipes(ValidationPipe)
  async premium(@Param('id') id: string, @Headers('secret') secret: string) {
    if (secret == process.env.SECRET) {
      return 'Premium not available';
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
      return this.usersService.delete(id);
    } else {
      throw new HttpException(
        'This is not open source data',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  @HttpCode(200)
  @Patch('follow/:userId')
  async follow(
    @Param('userId') followId: string,
    @Body() dto: UserIdDto,
    @Headers('secret') secret: string,
  ) {
    if (secret == process.env.SECRET) {
      return this.usersService.follow(followId, dto.id);
    } else {
      throw new HttpException(
        'This is not open source data',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  @HttpCode(200)
  @Delete('unfollow/:userId')
  async unfollow(
    @Param('userId') followId: string,
    @Headers('my-user-id') myUserId: string,
    @Headers('secret') secret: string,
  ) {
    if (secret == process.env.SECRET) {
      return this.usersService.unfollow(followId, myUserId);
    } else {
      throw new HttpException(
        'This is not open source data',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  @HttpCode(200)
  @Get('followers/:username')
  async followers(
    @Param('username') username: string,
    @Headers('secret') secret: string,
  ) {
    if (secret == process.env.SECRET) {
      return this.usersService.followers(username);
    } else {
      throw new HttpException(
        'This is not open source data',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  @HttpCode(200)
  @Get('following/:username')
  async following(
    @Param('username') username: string,
    @Headers('secret') secret: string,
  ) {
    if (secret == process.env.SECRET) {
      return this.usersService.following(username);
    } else {
      throw new HttpException(
        'This is not open source data',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }
}
