import { MAPProductResponseDto } from "market-app-bff-models";

export class GetProductResponseDto implements MAPProductResponseDto {

  constructor(partial?: Partial<GetProductResponseDto>) {
    if (partial) {
      this.brand = partial.brand;
      this.code = partial.code;
      this.content = partial.content;
      this.image = partial.image;
      this.name = partial.name;
      this.showName = partial.showName;
    }
  }

  brand: string;
  code: string;
  content: string;
  image?: string;
  name: string;
  showName: string;
}