import { Injectable } from '@nestjs/common';
import { ListRepository } from './repositories/list.repository';
import { CreateListDto, JwtUserData } from 'market-app-bff-models';

@Injectable()
export class ListService {
  constructor(
    private readonly listRepository: ListRepository
  ) { }

  handleCreateList(createListDto: CreateListDto, user: JwtUserData) {
    return this.listRepository.createList(user.sub, createListDto);
  }

  handleGetLists(owner: string) {
    return this.listRepository.getLists(owner);
  }
}
