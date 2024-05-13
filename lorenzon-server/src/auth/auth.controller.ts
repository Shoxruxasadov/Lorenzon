import {
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Get()
  async getAccounts(
    @Headers('accounts') accounts: string,
    @Headers('secret') secret: string,
  ) {
    if (secret == process.env.SECRET) {
      return this.authService.getAccounts(accounts);
    } else {
      throw new HttpException(
        'This is not open source data',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  @HttpCode(200)
  @Get(':token')
  async getByToken(
    @Param('token') token: string,
    @Headers('password') password: string,
    @Headers('secret') secret: string,
  ) {
    if (secret == process.env.SECRET) {
      return this.authService.getByToken(token, password);
    } else {
      throw new HttpException(
        'This is not open source data',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  @HttpCode(200)
  @Get('login/:method')
  async login(
    @Param('method') method: string,
    @Headers('login') login: string,
    @Headers('password') password: string,
    @Headers('secret') secret: string,
  ) {
    if (secret == process.env.SECRET) {
      return this.authService.login(method, login, password);
    } else {
      throw new HttpException(
        'This is not open source data',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }
}
