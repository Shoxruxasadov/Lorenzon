import { IsNotEmpty } from 'class-validator';

export class SongDto {
  @IsNotEmpty()
  id: any;
}
