import {
  Controller,
  HttpCode,
  Query,
  Get,
  Headers,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Controller('email')
export class EmailController {
  constructor(private readonly mailerService: MailerService) {}

  @HttpCode(200)
  @Get()
  async sendMail(@Query('to') to, @Headers('secret') secret: string) {
    if (secret == process.env.SECRET) {
      const random = Math.floor(Math.random() * 9000) + 1000;
      await this.mailerService
        .sendMail({
          to,
          from: 'lorenzon@umail.uz',
          subject: 'Confirm your account',
          // template: 'superhero',
          // context: {
          //   superHero: {code: random},
          // },
          text: `Welcome,

This email address was recently entered to verify your email address.

You can use this code to verify that this email belongs to you:

  ${random}

If you have not made a request to confirm your account, then simply ignore this letter.

Good luck!
Lorenzon team.`,
        })
        .then(() => {
          console.log('email send!');
        })
        .catch((err) => {
          console.log('Error while sending error email.', err);
        });

      return random;
    } else {
      throw new HttpException(
        'This is not open source data',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }
}
