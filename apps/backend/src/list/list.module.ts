import { Module } from '@nestjs/common';
import { ListService } from './list.service';
import { ListController } from './list.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ListModel, ListSchema } from './entities/list.schema';
import { ListRepository } from './repositories/list.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ListModel.name, schema: ListSchema }])
  ],
  controllers: [ListController],
  providers: [ListService, ListRepository],
})
export class ListModule { }
