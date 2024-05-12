export interface CreateListDto {
  name: string;
}

export interface GetListsDto {
  id: string;
  name: string;
}

export interface RequestPaginatedListsDto {
  page: number;
  pageSize: number;
}

export interface ResponsePaginatedListsDto<PItems = any> {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  items: PItems[];
}