import { IsEnum, IsNumber, IsOptional, IsString, Min } from "class-validator";
import { ProductUnit, ProductUnitEnum } from "src/common/models/product.mode";

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  brand: string;

  @IsString()
  code: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsNumber({ maxDecimalPlaces: 3, allowNaN: false, allowInfinity: false })
  @Min(0.001)
  quantity: number;

  @IsString()
  @IsEnum(ProductUnitEnum)
  quantityUnit: ProductUnit;

  @IsString()
  @IsOptional()
  showName: string;
}
