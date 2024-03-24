import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema({ collection: 'lists' })
export class ListModel {
  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop()
  total: number;

  @Prop()
  updatedAt: string;

  @Prop()
  items: ListItem[];
}

export class ListItem {
  @Prop()
  code: string;

  @Prop()
  name: string;

  @Prop()
  quantity: number;

  @Prop()
  price: number;

  @Prop()
  createdAt: string;

  @Prop()
  updatedAt: string;
}


export type ListDocument = HydratedDocument<ListModel>;
export const ListSchema = SchemaFactory.createForClass(ListModel);
