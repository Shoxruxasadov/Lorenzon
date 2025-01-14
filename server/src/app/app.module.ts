import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { SongsModule } from 'src/songs/songs.module';
import { AlbumsModule } from 'src/albums/albums.module';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { EmailModule } from 'src/email/email.module';
import { join } from 'path';
import { PlaylistsModule } from 'src/playlists/playlists.module';
import { SearchModule } from 'src/search/search.module';
import { RandomModule } from 'src/random/random.module';
import { SupportModule } from 'src/support/support.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb+srv://shoxruxasadov:M8zRI1MJFKTZFptI@lorenzon.jjoghyy.mongodb.net/?retryWrites=true&w=majority&appName=Lorenzon`,
    ),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.sendgrid.net',
        auth: {
          user: 'apikey',
          pass: process.env.SENDGRID_API_KEY,
        },
      },
      // template: {
      //   dir: join(__dirname, 'mails'),
      //   adapter: new HandlebarsAdapter(),
      // },
    }),
    UsersModule,
    SongsModule,
    AlbumsModule,
    PlaylistsModule,
    SearchModule,
    AuthModule,
    EmailModule,
    RandomModule,
    SupportModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}