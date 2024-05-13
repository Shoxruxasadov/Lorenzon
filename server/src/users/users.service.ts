import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Users, UsersDocument } from './users.schema';
import { UsersDto } from './dto/users.dto';
import mongoose, { Model } from 'mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';
import { Songs, SongsDocument } from 'src/songs/songs.schema';
import { ObjectId } from 'mongoose';
import { Support, SupportDocument } from 'src/support/support.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private usersModel: Model<UsersDocument>,
    @InjectModel(Songs.name) private songsModel: Model<SongsDocument>,
    @InjectModel(Support.name) private supportModel: Model<SupportDocument>,
  ) {}

  async getAllUser() {
    return this.usersModel.find({ role: { $ne: 'singer' } });
  }

  async getAllSingers() {
    return this.usersModel.find({ role: 'singer' });
  }

  async getBySingerName(name: string) {
    return this.usersModel.find({
      name: { $regex: name, $options: 'i' },
      role: 'singer',
    });
  }

  async create(dto: UsersDto): Promise<Users> {
    const user = await this.usersModel.findOne({ email: dto.email });

    if (user) {
      throw new HttpException(
        'Email is already token',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const createdUser = await this.usersModel.create(dto);
    return createdUser.save();
  }

  async getById(id: string) {
    return this.usersModel.findById(id);
  }

  async getByUsername(username: string) {
    const user = await this.usersModel.aggregate([
      {
        $match: {
          username: username,
        },
      },
      {
        $lookup: {
          from: 'songs',
          localField: '_id',
          foreignField: 'singerId',
          as: 'songs',
        },
      },
      {
        $lookup: {
          from: 'albums',
          localField: '_id',
          foreignField: 'singerId',
          as: 'albums',
        },
      },
      {
        $lookup: {
          from: 'playlists',
          localField: '_id',
          foreignField: 'subscribers',
          as: 'playlists',
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
      {
        $lookup: {
          from: 'songs',
          localField: 'recently',
          foreignField: '_id',
          as: 'recently',
        },
      },
    ]);

    return {
      _id: user[0]._id,
      name: user[0].name,
      status: user[0].status,
      role: user[0].role,
      username: user[0].username,
      recently: user[0].recently,
      image: user[0].image,
      banner: user[0].banner,
      songs: user[0].songs,
      albums: user[0].albums,
      playlists: user[0].playlists,
      yourPlaylists: user[0].yourPlaylists,
      country: user[0].country,
      description: user[0].description,
      socials: user[0].socials,
      website: user[0].website,
      followers: user[0].followers,
      following: user[0].following,
    };
  }

  async getByEmail(email: string) {
    return this.usersModel.find({ email: email });
  }

  async update(id: string, dto: UsersDto) {
    return this.usersModel.findByIdAndUpdate(id, dto, { new: true });
  }

  async lastSongPatch(id: string, song: string) {
    const user = await this.usersModel.findById(id);

    function removerDuplicate(array: any) {
      const songIdString = array.map((el) => el.toString());
      songIdString.unshift(song);
      const songs = [...new Set(songIdString)];
      const res = songs.map((el: string) => new mongoose.Types.ObjectId(el));
      return res.slice(0, 50);
    }

    function arrayCheckField(id: string, array: any) {
      const songIdString = array.map((el) => el.toString());
      for (let i = 0; i < songIdString.length; ++i) {
        if (songIdString[i] == id) return false;
      }
      return true;
    }

    if (arrayCheckField(song, user.recently)) {
      await this.songsModel.findByIdAndUpdate(
        { _id: song },
        { $inc: { listenCount: 1 } },
        { upsert: true },
      );
    }

    return this.usersModel.findByIdAndUpdate(
      { _id: id },
      {
        lastSong: new mongoose.Types.ObjectId(song),
        recently: removerDuplicate(user.recently),
      },
      { upsert: true },
    );
  }

  async delete(id: string) {
    return this.usersModel.findByIdAndDelete(id);
  }

  async follow(followId: string, followingId: string) {
    const followUser = await this.usersModel.findById(followId);
    const followingUser = await this.usersModel.findById(followingId);

    function removerDuplicateFollowers(array: any) {
      const followIdString = array.map((el) => el.toString());
      followIdString.unshift(followingId);
      const followers = [...new Set(followIdString)];
      return followers.map((el: string) => new mongoose.Types.ObjectId(el));
    }

    function removerDuplicateFollowing(array: any) {
      const followingIdString = array.map((el) => el.toString());
      followingIdString.unshift(followId);
      const followers = [...new Set(followingIdString)];
      return followers.map((el: string) => new mongoose.Types.ObjectId(el));
    }

    this.supportModel.create({
      applicant: new mongoose.Types.ObjectId(followingId),
      whom: new mongoose.Types.ObjectId(followId),
      subject: `@${followingUser.username}`,
      message: 'Started following you.',
      type: 'follow',
      live: followingUser.image,
    });

    await this.usersModel.findByIdAndUpdate(
      { _id: followId },
      { followers: removerDuplicateFollowers(followUser.followers) },
      { upsert: true },
    );

    await this.usersModel.findByIdAndUpdate(
      { _id: followingId },
      { following: removerDuplicateFollowing(followingUser.following) },
      { upsert: true },
    );

    return 'You are followed';
  }

  async unfollow(followId: string, followingId: string) {
    const followUser = await this.usersModel.findById(followId);
    const followingUser = await this.usersModel.findById(followingId);

    function removerDuplicateFollowers(array: any) {
      const followIdString = array
        .map((el) => el.toString())
        .filter((el) => el != followingId);
      const followers = [...new Set(followIdString)];
      return followers.map((el: string) => new mongoose.Types.ObjectId(el));
    }

    function removerDuplicateFollowing(array: any) {
      const followingIdString = array
        .map((el) => el.toString())
        .filter((el) => el != followId);
      const followers = [...new Set(followingIdString)];
      return followers.map((el: string) => new mongoose.Types.ObjectId(el));
    }

    await this.usersModel.findByIdAndUpdate(
      { _id: followId },
      { followers: removerDuplicateFollowers(followUser.followers) },
      { upsert: true },
    );

    await this.usersModel.findByIdAndUpdate(
      { _id: followingId },
      { following: removerDuplicateFollowing(followingUser.following) },
      { upsert: true },
    );

    return 'Unfollow';
  }

  async followers(username: string) {
    const user = await this.usersModel
      .findOne({ username })
      .populate('followers');

    if (!user) {
      throw new HttpException(
        'User not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const followers = await Promise.all(
      user.followers.map(async (follower) => {
        const userDoc = await this.usersModel
          .findById(follower)
          .select('_id name username role image');
        return userDoc
          ? {
              _id: userDoc._id,
              name: userDoc.name,
              username: userDoc.username,
              role: userDoc.role,
              image: userDoc.image,
            }
          : null;
      }),
    );

    return followers.filter((user) => user !== null);
  }

  async following(username: string) {
    const user = await this.usersModel
      .findOne({ username })
      .populate('following');

    if (!user) {
      throw new HttpException(
        'User not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const followingUsers = await Promise.all(
      user.following.map(async (following) => {
        const userDoc = await this.usersModel
          .findById(following)
          .select('_id name username role image');
        return userDoc
          ? {
              _id: userDoc._id,
              name: userDoc.name,
              username: userDoc.username,
              role: userDoc.role,
              image: userDoc.image,
            }
          : null;
      }),
    );

    return followingUsers.filter((user) => user !== null);
  }
}
