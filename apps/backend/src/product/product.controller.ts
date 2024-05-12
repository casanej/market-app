import { BadRequestException, Body, Controller, Get, Param, Post, Query, Req, Res } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Get('')
  list(
    @Res() res: Response,
    @Query('page') qPage: number, @Query('pageSize') qPageSize: number
  ) {
    const page = qPage - 1 ?? 0;
    const pageSize = qPageSize ?? 10;

    if (page < 0) throw new BadRequestException('Page number must be greater than 1.', 'PC-001');
    if (pageSize < 1) throw new BadRequestException('Page size must be greater than 0.', 'PC-002');

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