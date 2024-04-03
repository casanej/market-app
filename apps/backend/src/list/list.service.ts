import { Injectable } from '@nestjs/common';
import { ListRepository } from './repositories/list.repository';
import { CreateListDto, GetListsDto, JwtUserData } from 'market-app-bff-models';
import { GetListsResponseDto } from './dto/get-lists-response.dto';

@Injectable()
export class ListService {
  constructor(
    private readonly listRepository: ListRepository
  ) { }

  async handleCreateList(createListDto: CreateListDto, user: JwtUserData) {
    return await this.listRepository.createList(user.sub, createListDto);
  }

  async handleGetLists(owner: string): Promise<GetListsDto[]> {
    const lists = await this.listRepository.getLists(owner);

    return lists.map(list => (new GetListsResponseDto(list)));
  }
}
