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

  @Prop({ instance: String })
  content: string;

  @Prop({ instance: String, required: false })
  image?: string;

  @Prop({ instance: String })
  name: string;

  @Prop({ instance: String })
  showName: string;
}

export type ProductsDocument = HydratedDocument<ProductsModel>;
export const ProductsSchema = SchemaFactory.createForClass(ProductsModel);
