import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';
import { Users } from '../users/users.schema';
import { Albums } from '../albums/albums.schema';

export type SongsDocument = HydratedDocument<Songs>;

@Schema({ timestamps: true })
export class Songs {
  @Prop({ required: true })
  name: string;
  @Prop([
    {
      type: MongooseSchema.Types.ObjectId,
      required: true,
      ref: 'Users',
    },
  ])
  singerId: Users[];
  @Prop({ required: true })
  singerName: string[];
  @Prop({ required: true })
  singerUsername: string[];
  @Prop({ required: true })
  wrote: string[];
  @Prop({ required: true })
  source: string;
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    required: true,
    ref: 'Albums',
  })
  album: Albums;
  @Prop({ required: true })
  image: string;
  @Prop({ required: true })
  song: string;
  @Prop({ required: true })
  createdDay: string;
  @Prop({ required: true })
  listenCount: number;
}

export const SongsSchema = SchemaFactory.createForClass(Songs);
