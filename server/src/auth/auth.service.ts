import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Users, UsersDocument } from '../users/users.schema';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Users.name) private usersModel: Model<UsersDocument>,
  ) {}

  async getAccounts(accounts: string) {
    const token = JSON.parse(accounts);
    if (token.length >= 1) {
      const firstAccount = await this.usersModel.find({
        _id: token[0].id,
        password: token[0].password,
      });
      if (token.length >= 2) {
        const secondAccount = await this.usersModel.find({
          _id: token[1].id,
          password: token[1].password,
        });
        if (token.length == 3) {
          const thirdAccount = await this.usersModel.find({
            _id: token[2].id,
            password: token[2].password,
          });
          return [
            {
              _id: firstAccount[0]._id,
              name: firstAccount[0].name,
              image: firstAccount[0].image,
              password: firstAccount[0].password,
            },
            {
              _id: secondAccount[0]._id,
              name: secondAccount[0].name,
              image: secondAccount[0].image,
              password: secondAccount[0].password,
            },
            {
              _id: thirdAccount[0]._id,
              name: thirdAccount[0].name,
              image: thirdAccount[0].image,
              password: thirdAccount[0].password,
            },
          ];
        } else {
          return [
            {
              _id: firstAccount[0]._id,
              name: firstAccount[0].name,
              image: firstAccount[0].image,
              password: firstAccount[0].password,
            },
            {
              _id: secondAccount[0]._id,
              name: secondAccount[0].name,
              image: secondAccount[0].image,
              password: secondAccount[0].password,
            },
          ];
        }
      } else {
        return [
          {
            _id: firstAccount[0]._id,
            name: firstAccount[0].name,
            image: firstAccount[0].image,
            password: firstAccount[0].password,
          },
        ];
      }
    } else {
      throw new HttpException(
        'Accounts not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async getByToken(token: string, password: string) {
    const user = await this.usersModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(token),
          password: password,
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
      {
        $lookup: {
          from: 'songs',
          localField: 'lastSong',
          foreignField: '_id',
          as: 'lastSong',
        },
      },
      {
        $lookup: {
          from: 'supports',
          localField: '_id',
          foreignField: 'whom',
          as: 'news',
        },
      },
    ]);

    return {
      _id: user[0]._id,
      name: user[0].name,
      username: user[0].username,
      status: user[0].status,
      premium: user[0].premium,
      role: user[0].role,
      image: user[0].image,
      lastSong: user[0].lastSong[0],
      recently: user[0].recently,
      playlists: user[0].playlists,
      yourPlaylists: user[0].yourPlaylists,
      news: user[0].news,
    };
  }

  async login(method: string, login: string, password: string) {
    if (method == 'username') {
      return this.usersModel
        .find({
          username: login,
          password: password,
        })
        .then((res) => ({
          id: res[0]._id,
          password: res[0].password,
        }))
        .catch(() => {
          throw new HttpException(
            'Wrong email or password',
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
        });
    }

    if (method == 'email') {
      return this.usersModel
        .find({
          email: login,
          password: password,
        })
        .then((res) => ({
          id: res[0]._id,
          password: res[0].password,
        }))
        .catch(() => {
          throw new HttpException(
            'Wrong email or password',
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
        });
    }

    throw new HttpException(
      'Login method undefined',
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}
