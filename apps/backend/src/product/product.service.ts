import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from './repositories/product.repository';
import { OpenFoodFactsService } from 'src/vendors/open-food-facts.service';
import { MAPProductResponseDto, OpenFoodProduct } from 'market-app-bff-models';
import { GetProductResponseDto } from './dto/get-product-response.dto';
import { ProductsModel } from './entities/product.entity';
import { promiseSettledHelper } from 'src/common/utils/promise';

@Injectable()
export class ProductService {
  constructor(
    private readonly productsRepository: ProductRepository,
    private readonly openFoodFactsService: OpenFoodFactsService,
  ) { }

  async findOne(barcode: string): Promise<MAPProductResponseDto> {
    const findProductPromises = [
      this.productsRepository.findProductByBarcode(barcode),
      this.openFoodFactsService.getProduct(barcode),
    ];

    const [product, openFoodProduct] = await promiseSettledHelper<[ProductsModel | null, OpenFoodProduct]>(findProductPromises);

    const response = new GetProductResponseDto();

    if (!product && openFoodProduct.status === 0) throw new NotFoundException('Product not found.', 'PS-001');

    if (openFoodProduct.status === 1) {
      response.brand = openFoodProduct.product.brands;
      response.code = openFoodProduct.code;
      response.name = openFoodProduct.product.product_name;
      response.showName = `${openFoodProduct.product.brands} - ${openFoodProduct.product.product_name} - ${openFoodProduct.product.quantity}`;
    }

    if (product) {
      response.brand = product.brand;
      response.code = product.code;
      response.content = product.content;
      response.image = product.image;
      response.name = product.name;
      response.showName = product.showName;
    }

    return response;
  }
}
