import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ProductRepository } from './repositories/product.repository';
import { OpenFoodFactsService } from 'src/vendors/open-food-facts.service';
import { JwtUserData, MAPProductResponseDto, OpenFoodProduct, ResponsePaginatedListsDto } from 'market-app-bff-models';
import { GetProductResponseDto } from './dto/get-product-response.dto';
import { ProductsModel, ProductsModelHelper } from './entities/product.entity';
import { promiseSettledHelper } from 'src/common/utils/promise';
import { CreateProductDto } from './dto/create-product.dto';

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
      response.setData({
        brand: openFoodProduct.product.brands,
        code: openFoodProduct.code,
        name: openFoodProduct.product.product_name,
        showName: `${openFoodProduct.product.brands} - ${openFoodProduct.product.product_name} - ${openFoodProduct.product.quantity}`,
      });
    }

    if (product) {
      response.setData(product);
    }

    return response;
  }

  async list(page: number, pageSize: number): Promise<ResponsePaginatedListsDto<MAPProductResponseDto>> {
    if (page < 0) throw new BadRequestException('Page number must be greater than 1.', 'PC-001');
    if (pageSize < 1) throw new BadRequestException('Page size must be greater than 0.', 'PC-002');

    const { totalItems, products } = await this.productsRepository.listProducts(page, pageSize);

    return {
      items: products.map(product => new GetProductResponseDto(product)),
      currentPage: page,
      totalItems,
      totalPages: Math.ceil(totalItems / pageSize),
    };
  }

  async register(user: JwtUserData, product: CreateProductDto): Promise<MAPProductResponseDto> {

    try {
      const newProduct = new ProductsModelHelper({
        ...product,
        registeredBy: user.sub,
      });
      const registeredProduct = await this.productsRepository.createProduct(newProduct);

      return new GetProductResponseDto(registeredProduct);
    } catch (error) {
      console.error('[ERROR TO REGISTER PRODUCT]', error);
      throw new InternalServerErrorException('Error to register product.', 'PS-002')
    }
  }
}
