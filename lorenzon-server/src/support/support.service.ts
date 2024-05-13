import { Injectable } from '@nestjs/common';
import { Support, SupportDocument } from './support.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class SupportService {
  constructor(
    @InjectModel(Support.name) private supportModel: Model<SupportDocument>,
  ) {}
}
