import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database.module';
import { ConfigModule } from '@nestjs/config';
import { ListModule } from './list/list.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV}`, `.env.${process.env.NODE_ENV}.local`],
    }),
    DatabaseModule,
    ListModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
