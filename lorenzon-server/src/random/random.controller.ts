import {
  Controller,
  Get,
  HttpCode,
  Headers,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { RandomService } from './random.service';

@Controller('random')
export class RandomController {
  constructor(private readonly randomService: RandomService) {}

  @HttpCode(200)
  @Get()
  async getRandom(@Headers('secret') secret: string) {
    if (secret == process.env.SECRET) {
      return this.randomService.getRandom();
    } else {
      throw new HttpException(
        'This is not open source data',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }
}
