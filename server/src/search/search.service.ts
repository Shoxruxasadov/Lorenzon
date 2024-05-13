import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Users, UsersDocument } from 'src/users/users.schema';
import { Songs, SongsDocument } from 'src/songs/songs.schema';
import { Albums, AlbumsDocument } from 'src/albums/albums.schema';
import { Playlists, PlaylistsDocument } from 'src/playlists/playlists.schema';

@Injectable()
export class SearchService {
  constructor(
    @InjectModel(Users.name) private usersModel: Model<UsersDocument>,
    @InjectModel(Songs.name) private songsModel: Model<SongsDocument>,
    @InjectModel(Albums.name) private albumsModel: Model<AlbumsDocument>,
    @InjectModel(Playlists.name) private playlistsModel: Model<PlaylistsDocument>,
  ) {}

  async getSearch(search: string) {
    const profiles = await this.usersModel
      .find({
        name: { $regex: search, $options: 'i' },
        role: { $ne: 'singer' },
      }).limit(10);

    const singers = await this.usersModel
      .find({
        name: { $regex: search, $options: 'i' },
        role: 'singer',
      }).limit(10);

    const songs = await this.songsModel
      .find({
        name: { $regex: search, $options: 'i' },
      }).limit(15);

    const albums = await this.albumsModel
      .find({
        name: { $regex: search, $options: 'i' },
      }).limit(10);

    const playlists = await this.playlistsModel
      .find({
        name: { $regex: search, $options: 'i' },
      }).limit(10);

    if (
      !songs.length &&
      !singers.length &&
      !albums.length &&
      !playlists.length &&
      !profiles.length
    ) return null;
    
    return {
      topSong: songs.length > 0 ? songs[0] : null,
      popularSongs: songs.length > 1 ? songs.slice(1, 5) : [],
      otherSongs: songs.length > 5 ? songs.slice(5) : [],
      singers: singers,
      albums: albums,
      playlists: playlists,
      profiles: profiles,
    };
  }

  async getSongs(search: string) {
    if (!search) return [];
    return this.songsModel.find({
      name: { $regex: search, $options: 'i' },
    });
  }

  async getSingers(search: string) {
    if (!search) return [];
    return this.usersModel.find({
      name: { $regex: search, $options: 'i' },
      role: 'singer',
    });
  }

  async getAlbums(search: string) {
    if (!search) return [];
    return this.albumsModel.find({
      name: { $regex: search, $options: 'i' },
    });
  }

  async getPlaylists(search: string) {
    if (!search) return [];
    return this.playlistsModel.find({
      name: { $regex: search, $options: 'i' },
    });
  }

  async getProfiles(search: string) {
    if (!search) return [];
    return this.usersModel.find({
      name: { $regex: search, $options: 'i' },
      role: { $ne: 'singer' },
    });
  }
}
