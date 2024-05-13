import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { SocialDto } from './social.dto';

export class UsersDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password: string;

  @IsNotEmpty()
  status: string;
  
  premium: string | null;

  @IsNotEmpty()
  role: string;

  @IsNotEmpty()
  username: string;

  recently: any[] | null;
  lastSong: string | null;
  gender: string | null;
  country: string | null;
  birthday: string | null;
  image: string | null;
  banner: string | null;

  description: string | null;
  website: string | null;
  socials: SocialDto;
  followers: any[];
  following: any[];
}
