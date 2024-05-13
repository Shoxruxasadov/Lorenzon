import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from './users.schema';
import { Songs, SongsSchema } from 'src/songs/songs.schema';
import { Support, SupportSchema } from 'src/support/support.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
    MongooseModule.forFeature([{ name: Songs.name, schema: SongsSchema }]),
    MongooseModule.forFeature([{ name: Support.name, schema: SupportSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
