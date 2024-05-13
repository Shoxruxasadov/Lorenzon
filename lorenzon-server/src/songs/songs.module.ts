import { Module } from '@nestjs/common';
import { SongsService } from './songs.service';
import { SongsController } from './songs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Songs, SongsSchema } from './songs.schema';
import { Albums, AlbumsSchema } from 'src/albums/albums.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Songs.name, schema: SongsSchema }]),
    MongooseModule.forFeature([{ name: Albums.name, schema: AlbumsSchema }]),
  ],
  controllers: [SongsController],
  providers: [SongsService],
})
export class SongsModule {}
