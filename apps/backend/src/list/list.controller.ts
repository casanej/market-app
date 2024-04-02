import { Controller, Post, Body, Req, Get } from '@nestjs/common';
import { ListService } from './list.service';
import { CreateListDto } from 'market-app-bff-models';

@Controller('list')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Post()
  create(@Body() createListDto: CreateListDto, @Req() req: Request) {
    return this.listService.handleCreateList(createListDto, req.user);
  }

  @Get()
  getLists(@Req() req: Request) {
    return this.listService.handleGetLists(req.user.sub as string);
  }
}
