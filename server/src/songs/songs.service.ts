import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SongsDto } from './dto/songs.dto';
import mongoose, { Model } from 'mongoose';
import { Songs, SongsDocument } from './songs.schema';
import { Albums, AlbumsDocument } from 'src/albums/albums.schema';

@Injectable()
export class SongsService {
  constructor(
    @InjectModel(Songs.name) private songsModel: Model<SongsDocument>,
    @InjectModel(Albums.name) private albumsModel: Model<AlbumsDocument>,
  ) {}

  async getAllSongs() {
    return await this.songsModel.find({});
  }

  async getRandomSongs() {
    return await this.songsModel.aggregate([{ $sample: { size: 10 } }]);
  }

  async create(dto: SongsDto) {
    dto.singerId = dto.singerId.map(
      (id: any) => new mongoose.Types.ObjectId(id),
    );

    function combineArrays(arrays) {
      var combinedArray = [];
      arrays.forEach((array) => {
        array.forEach((element) => {
          if (combinedArray.indexOf(element) === -1) {
            combinedArray.push(element);
          }
        });
      });
      return combinedArray;
    }

    if (dto.album === null) {
      await this.albumsModel
        .create({
          name: dto.name,
          singerId: dto.singerId,
          singerName: dto.singerName,
          singerUsername: dto.singerUsername,
          image: dto.image,
        })
        .then((res) => (dto.album = res._id));
    } else {
      const album = await this.albumsModel.findById(dto.album);
      await this.albumsModel.findByIdAndUpdate(
        { _id: dto.album },
        {
          singerId: combineArrays([album.singerId, dto.singerId]),
          singerName: combineArrays([album.singerName, dto.singerName]),
          singerUsername: combineArrays([album.singerUsername, dto.singerUsername]),
        },
        { upsert: true },
      );
    }

    return this.songsModel.create(dto);
  }

  async delete(id: string) {
    return this.songsModel.findByIdAndDelete(id);
  }
}
