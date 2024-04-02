import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { UsersModel } from "src/user/entities/user.entity";

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

@Schema({ collection: 'lists' })
export class ListModel {
  @Prop({ instance: String, ref: UsersModel.name })
  owner: string;

  @Prop({ instance: String })
  name: string;

  @Prop({ instance: Number, default: 0 })
  total: number;

  @Prop({ instance: String, default: new Date().toISOString() })
  updatedAt: string;

  @Prop({ instance: ListItem, _id: false })
  items: ListItem[];
}

export type ListDocument = HydratedDocument<ListModel>;
export const ListSchema = SchemaFactory.createForClass(ListModel);
