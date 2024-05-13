import { IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @IsNotEmpty()
  user: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  login: string;
}
