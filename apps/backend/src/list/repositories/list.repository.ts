import { Model } from 'mongoose';
import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ListModel } from '../entities/list.schema';
import { CreateListDto } from 'market-app-bff-models';

@Injectable()
export class ListRepository {
  constructor(@InjectModel(ListModel.name) private listModel: Model<ListModel>) { }

  async createList(owner: string, createCatDto: CreateListDto): Promise<ListModel> {
    try {
      const createList = new this.listModel({
        owner,
        name: createCatDto.name,
      });

      const validation = createList.validateSync();

      if (validation) {
        const errorMessage = Object.keys(validation.errors).map(key => validation.errors[key].message)
        throw new BadRequestException(errorMessage, 'L.R-001');
      }

      return createList.save();
    } catch (error) {
      console.log('error', error);
      throw new InternalServerErrorException(error);
    }
  }

  async getLists(owner: string): Promise<ListModel[]> {
    return this.listModel.find({
      owner
    });
  }
}
