import { IsNotEmpty } from 'class-validator';

export class SongsDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  singerId: any;

  @IsNotEmpty()
  singerName: string[];

  @IsNotEmpty()
  singerUsername: string[];

  @IsNotEmpty()
  wrote: string[];

  @IsNotEmpty()
  source: string;

  album: any | null;

  @IsNotEmpty()
  image: string;

  @IsNotEmpty()
  song: string;

  @IsNotEmpty()
  createdDay: string;

  @IsNotEmpty()
  listenCount: number;
}
