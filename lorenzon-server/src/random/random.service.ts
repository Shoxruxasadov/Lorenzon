import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Albums, AlbumsDocument } from 'src/albums/albums.schema';
import { Playlists, PlaylistsDocument } from 'src/playlists/playlists.schema';
import { Songs, SongsDocument } from 'src/songs/songs.schema';
import { Users, UsersDocument } from 'src/users/users.schema';

@Injectable()
export class RandomService {
  constructor(
    @InjectModel(Users.name) private usersModel: Model<UsersDocument>,
    @InjectModel(Songs.name) private songsModel: Model<SongsDocument>,
    @InjectModel(Albums.name) private albumsModel: Model<AlbumsDocument>,
    @InjectModel(Playlists.name) private playlistsModel: Model<PlaylistsDocument>,
  ) {}

  async getRandom() {
    const songs = await this.songsModel.aggregate([{ $sample: { size: 10 } }]);
    const albums = await this.albumsModel.aggregate([{ $sample: { size: 10 } }]);
    const playlists = await this.playlistsModel.aggregate([{ $sample: { size: 10 } }]);
    const singers = await this.usersModel
      .aggregate([{ $match: { role: 'singer' } }, { $sample: { size: 10 } }])
      .then((data) =>
        data.map((item) => ({
          name: item.name,
          username: item.username,
          image: item.image,
        })),
      );

    return { songs, singers, albums, playlists };
  }
}
