import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from 'src/users/users.schema';
import { Songs, SongsSchema } from 'src/songs/songs.schema';
import { Albums, AlbumsSchema } from 'src/albums/albums.schema';
import { Playlists, PlaylistsSchema } from 'src/playlists/playlists.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
    MongooseModule.forFeature([{ name: Songs.name, schema: SongsSchema }]),
    MongooseModule.forFeature([{ name: Albums.name, schema: AlbumsSchema }]),
    MongooseModule.forFeature([{ name: Playlists.name, schema: PlaylistsSchema }]),
  ],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
