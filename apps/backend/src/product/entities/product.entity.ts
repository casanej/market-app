import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema({ collection: 'products' })
export class ProductsModel {
  @Prop({ instance: String })
  id: string;

  @Prop({ instance: String })
  brand: string;

  @Prop({ instance: String })
  code: string;

  @Prop({ instance: Number })
  content: number;

  @Prop({ instance: String, required: false })
  image?: string;

  @Prop({ instance: Boolean, default: false })
  isVerified: boolean;

  @Prop({ instance: String })
  name: string;

  @Prop({ instance: String })
  showName: string;

  @Prop({ instance: String, default: '' })
  registeredBy: string;
}

export type ProductsDocument = HydratedDocument<ProductsModel>;
export const ProductsSchema = SchemaFactory.createForClass(ProductsModel);


export class ProductsModelHelper implements ProductsModel {
  id: string;
  brand: string;
  code: string;
  content: number;
  image: string;
  isVerified: boolean;
  name: string;
  showName: string;
  registeredBy: string;

  constructor(initData?: Partial<ProductsModelHelper>) {
    if (initData) {
      this.id = initData.id;
      this.brand = initData.brand;
      this.code = initData.code;
      this.content = initData.content;
      this.image = initData.image;
      this.isVerified = initData.isVerified;
      this.name = initData.name;
      this.showName = initData.showName ?? `${initData.brand} - ${initData.name}`;
      this.registeredBy = initData.registeredBy;
    }
  }
}