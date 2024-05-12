import { FilterQuery, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProductsModel } from '../entities/product.entity';

@Injectable()
export class ProductRepository {
  constructor(@InjectModel(ProductsModel.name) private productsModel: Model<ProductsModel>) { }

  private async filterProduct(filter: FilterQuery<ProductsModel>) {
    return await this.productsModel.findOne(filter);
  }

  async findProductByBarcode(barcode: string) {
    const query = await this.filterProduct({ code: barcode });

    if (!query) return null;

    return query.toObject();
  }

  async createProduct(product: ProductsModel) {
    const newProduct = new this.productsModel(product);

    return await newProduct.save();
  }

  async listProducts(page: number, pageSize: number) {
    // get paginated products and total items
    const products = await this.productsModel.find().skip(page * pageSize).limit(pageSize).exec();
    const totalItems = await this.productsModel.countDocuments();

    return {
      products,
      totalItems,
    }
  }
}
