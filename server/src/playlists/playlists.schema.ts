import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';
import { Users } from '../users/users.schema';
import { Songs } from '../songs/songs.schema';

export type PlaylistsDocument = HydratedDocument<Playlists>;

@Schema({ timestamps: true })
export class Playlists {
  @Prop({ required: true })
  name: string;
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    required: true,
    ref: 'Users',
  })
  creatorId: Users;
  @Prop({ required: true })
  creatorName: string;
  @Prop({ required: true })
  creatorUsername: string;
  @Prop()
  image: string | null;
  @Prop()
  description: string | null;
  @Prop([
    {
      type: MongooseSchema.Types.ObjectId,
      required: true,
      ref: 'Users',
    },
  ])
  subscribers: Users[];
  @Prop([
    {
      type: MongooseSchema.Types.ObjectId,
      required: true,
      ref: 'Songs',
    },
  ])
  songs: Songs[];
}

export const PlaylistsSchema = SchemaFactory.createForClass(Playlists);
