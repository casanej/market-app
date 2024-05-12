import { MAPProductResponseDto } from "market-app-bff-models";

export class GetProductResponseDto implements MAPProductResponseDto {
  brand: string;
  code: string;
  quantity: number;
  image?: string;
  name: string;
  showName: string;

  constructor(partial?: Partial<GetProductResponseDto>) {
    this.setData(partial);
  }

  setData(partial?: Partial<GetProductResponseDto>) {
    if (partial) {
      this.brand = partial.brand;
      this.code = partial.code;
      this.quantity = partial.quantity;
      this.image = partial.image;
      this.name = partial.name;
      this.showName = partial.showName;
    }
  }
}