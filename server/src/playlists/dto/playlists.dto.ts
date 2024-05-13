import { IsNotEmpty } from 'class-validator';

export class PlaylistsDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  creatorId: any;
  @IsNotEmpty()
  creatorName: string;
  @IsNotEmpty()
  creatorUsername: string;

  image: string | null;
  description: string | null;
  subscribers: any | [];
  songs: any | [];
}
