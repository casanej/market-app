import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductRepository } from './repositories/product.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModel, ProductsSchema } from './entities/product.entity';
import { VendorsModule } from 'src/vendors/vendors.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ProductsModel.name, schema: ProductsSchema }]),
    VendorsModule,
  ],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
})
export class ProductModule { }
