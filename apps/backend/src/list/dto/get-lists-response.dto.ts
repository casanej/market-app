import { GetListsDto } from "market-app-bff-models";

export class GetListsResponseDto implements GetListsDto {

  constructor(partial: Partial<GetListsResponseDto>) {
    if (partial) {
      this.id = partial.id;
      this.name = partial.name;
    }
  }

  id: string;
  name: string;
}