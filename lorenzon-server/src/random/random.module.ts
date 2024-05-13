import { Module } from '@nestjs/common';
import { RandomService } from './random.service';
import { RandomController } from './random.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Songs, SongsSchema } from 'src/songs/songs.schema';
import { Users, UsersSchema } from 'src/users/users.schema';
import { Albums, AlbumsSchema } from 'src/albums/albums.schema';
import { Playlists, PlaylistsSchema } from 'src/playlists/playlists.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Songs.name, schema: SongsSchema }]),
    MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
    MongooseModule.forFeature([{ name: Albums.name, schema: AlbumsSchema }]),
    MongooseModule.forFeature([{ name: Playlists.name, schema: PlaylistsSchema }]),
  ],
  controllers: [RandomController],
  providers: [RandomService],
})
export class RandomModule {}
