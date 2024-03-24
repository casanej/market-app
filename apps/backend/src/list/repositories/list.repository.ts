import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ListModel } from '../entities/list.schema';
import { CreateListDto } from '../dto/create-list.dto';

@Injectable()
export class ListRepository {
  constructor(@InjectModel(ListModel.name) private listModel: Model<ListModel>) { }

  async create(createCatDto: CreateListDto): Promise<ListModel> {
    const createList = new this.listModel({
      name: createCatDto.name
    });
    return createList.save();
  }

  async findAll(): Promise<ListModel[]> {
    return this.listModel.find().exec();
  }
}
