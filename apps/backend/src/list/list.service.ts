import { Injectable } from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { ListRepository } from './repositories/list.repository';

@Injectable()
export class ListService {
  constructor(
    private readonly listRepository: ListRepository
  ) { }

  create(createListDto: CreateListDto) {
    return this.listRepository.create(createListDto);
  }

  findAll() {
    return this.listRepository.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} list`;
  }

  update(id: number, updateListDto: UpdateListDto) {
    return `This action updates a #${id} list`;
  }

  remove(id: number) {
    return `This action removes a #${id} list`;
  }
}
