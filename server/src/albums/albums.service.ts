import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Albums, AlbumsDocument } from './albums.schema';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectModel(Albums.name) private albumsModel: Model<AlbumsDocument>,
  ) {}

  async getAllAlbums() {
    return await this.albumsModel.aggregate([
      {
        $lookup: {
          from: 'songs',
          localField: '_id',
          foreignField: 'album',
          as: 'songs',
        },
      },
    ]);;
  }

  async getAlbumsById(id: string) {
    return await this.albumsModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id),
        },
      },
      {
        $lookup: {
          from: 'songs',
          localField: '_id',
          foreignField: 'album',
          as: 'songs',
        },
      },
    ]);
  }

  async getByAlbumName(name: string) {
    return this.albumsModel.find({
      name: { $regex: name, $options: 'i' },
    });
  }
}
