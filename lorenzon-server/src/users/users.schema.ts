import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';
import { hash } from 'bcrypt';
import { SocialDto } from './dto/social.dto';

export type UsersDocument = HydratedDocument<Users>;

@Schema({ timestamps: true })
export class Users {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true, unique: true })
  email: string;
  @Prop({ required: true })
  password: string;
  @Prop({ required: true })
  status: string;
  @Prop()
  premium: string | null;
  @Prop({ required: true })
  role: string;
  @Prop({ unique: true })
  username: string;
  @Prop()
  lastSong: MongooseSchema.Types.ObjectId | null;
  @Prop()
  recently: MongooseSchema.Types.ObjectId[];
  @Prop()
  gender: string | null;
  @Prop()
  country: string | null;
  @Prop()
  birthday: string | null;
  @Prop()
  image: string | null;
  @Prop()
  banner: string | null;

  @Prop()
  description: string | null;
  @Prop()
  website: string | null;
  @Prop()
  socials: SocialDto;

  @Prop([
    {
      type: MongooseSchema.Types.ObjectId,
      required: true,
      ref: 'Users',
    },
  ])
  followers: MongooseSchema.Types.ObjectId[];
  @Prop([
    {
      type: MongooseSchema.Types.ObjectId,
      required: true,
      ref: 'Users',
    },
  ])
  following: MongooseSchema.Types.ObjectId[];
}

export const UsersSchema = SchemaFactory.createForClass(Users);

UsersSchema.pre<Users>('save', async function (next: Function) {
  this.password = await hash(this.password, 10);
  next();
});
