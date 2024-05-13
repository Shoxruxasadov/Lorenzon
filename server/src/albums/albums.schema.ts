import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';
import { Users } from '../users/users.schema';

export type AlbumsDocument = HydratedDocument<Albums>;

@Schema({ timestamps: true })
export class Albums {
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
  image: string;
}

export const AlbumsSchema = SchemaFactory.createForClass(Albums);
