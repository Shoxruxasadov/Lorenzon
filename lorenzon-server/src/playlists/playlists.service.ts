import { Injectable } from '@nestjs/common';
import { Playlists, PlaylistsDocument } from './playlists.schema';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { PlaylistsDto } from './dto/playlists.dto';
import { Users, UsersDocument } from 'src/users/users.schema';

@Injectable()
export class PlaylistsService {
  constructor(
    @InjectModel(Playlists.name)
    private playlistsModel: Model<PlaylistsDocument>,
    @InjectModel(Users.name) private usersModel: Model<UsersDocument>,
  ) {}

  async getAllPlaylists() {
    return this.playlistsModel.find({});
  }

  async getPlaylistById(id: string) {
    const playlist = await this.playlistsModel
      .findById(id)
      .populate('songs')
      .populate('creatorId')
      .then(async (res) => {
        const creatorPlaylists = await this.usersModel
          .aggregate([
            {
              $match: {
                username: res.creatorId.username,
              },
            },
            {
              $lookup: {
                from: 'playlists',
                localField: '_id',
                foreignField: 'creatorId',
                as: 'yourPlaylists',
              },
            },
          ])
          .then((res) =>
            res[0].yourPlaylists.map((playlist) => ({
              _id: playlist._id,
              name: playlist.name,
              username: playlist.creatorUsername,
              image: playlist.image,
            })),
          );

        return {
          name: res.name,
          image: res.image,
          description: res.description,
          subscribers: res.subscribers,
          songs: res.songs,
          creator: {
            name: res.creatorId.name,
            username: res.creatorId.username,
            image: res.creatorId.image,
          },
          playlists: creatorPlaylists.filter(
            (playlist) => res._id.toString() !== playlist._id.toString(),
          ),
        };
      });

    return playlist;
  }

  async getByPlaylistName(name: string) {
    return this.playlistsModel.find({
      name: { $regex: name, $options: 'i' },
    });
  }

  async create(dto: PlaylistsDto) {
    return this.playlistsModel.create(dto);
  }

  async addSong(playlistId: string, songId: string) {
    const playlist = await this.playlistsModel.findById(playlistId);

    function removerDuplicate(array: any) {
      const songIdString = array.map((el) => el.toString());
      songIdString.unshift(songId);
      const songs = [...new Set(songIdString)];
      const res = songs.map((el: string) => new mongoose.Types.ObjectId(el));
      return res.slice(0, 1000);
    }

    await this.playlistsModel.findByIdAndUpdate(
      { _id: playlistId },
      { songs: removerDuplicate(playlist.songs) },
      { upsert: true },
    );

    return 'Success';
  }

  async removeSong(playlistId: string, songId: string) {
    const playlist = await this.playlistsModel.findById(playlistId);

    function removerDuplicate(array: any) {
      const songIdString = array
        .map((el) => el.toString())
        .filter((el) => el != songId);
      const songs = [...new Set(songIdString)];
      const res = songs.map((el: string) => new mongoose.Types.ObjectId(el));
      return res.slice(0, 1000);
    }

    await this.playlistsModel.findByIdAndUpdate(
      { _id: playlistId },
      { songs: removerDuplicate(playlist.songs) },
      { upsert: true },
    );

    return 'Success deleted';
  }

  async addSubscriber(playlistId: string, userId: string) {
    const playlist = await this.playlistsModel.findById(playlistId);

    function removerDuplicate(array: any) {
      const subscriberIdString = array.map((el) => el.toString());
      subscriberIdString.push(userId);
      const subscribers = [...new Set(subscriberIdString)];
      return subscribers.map((el: string) => new mongoose.Types.ObjectId(el));
    }

    await this.playlistsModel.findByIdAndUpdate(
      { _id: playlistId },
      { subscribers: removerDuplicate(playlist.subscribers) },
      { upsert: true },
    );

    return 'You are subscribed';
  }

  async removeSubscriber(playlistId: string, userId: string) {
    const playlist = await this.playlistsModel.findById(playlistId);

    function removerDuplicate(array: any) {
      const subscriberIdString = array
        .map((el) => el.toString())
        .filter((el) => el != userId);
      const subscribers = [...new Set(subscriberIdString)];
      return subscribers.map((el: string) => new mongoose.Types.ObjectId(el));
    }

    await this.playlistsModel.findByIdAndUpdate(
      { _id: playlistId },
      { subscribers: removerDuplicate(playlist.subscribers) },
      { upsert: true },
    );

    return 'Unsubscribed';
  }

  async delete(playlistId: string) {
    await this.playlistsModel.findByIdAndDelete(playlistId);
    return 'Song success deleted';
  }
}
