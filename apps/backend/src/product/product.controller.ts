import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Get('')
  list(
    @Query('page') qPage: number, @Query('pageSize') qPageSize: number
  ) {
    const page = qPage - 1 ?? 0;
    const pageSize = qPageSize ?? 10;

    return this.productService.list(page, pageSize);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Post('register')
  register(@Req() { user }: Request, @Body() body: CreateProductDto) {
    return this.productService.register(user, body);
  }
}