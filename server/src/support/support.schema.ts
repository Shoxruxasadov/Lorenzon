import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';

export type SupportDocument = HydratedDocument<Support>;

@Schema({ timestamps: true })
export class Support {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    required: true,
    ref: 'Users',
  })
  applicant: MongooseSchema.Types.ObjectId;
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    required: true,
    ref: 'Users',
  })
  whom: MongooseSchema.Types.ObjectId | string;
  @Prop({ required: true })
  subject: string;
  @Prop({ required: true })
  message: string;
  @Prop({ required: true })
  type: string; // follow, global, feedback
  @Prop()
  live: string | null;
}

export const SupportSchema = SchemaFactory.createForClass(Support);
