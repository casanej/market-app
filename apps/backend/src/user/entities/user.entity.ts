import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema({ collection: 'users' })
export class UsersModel {
  @Prop({ instance: String })
  name: string;

  @Prop({ instance: String })
  email: string;

  @Prop({ instance: String })
  password: string;

  @Prop({ instance: Number, default: 0 })
  permissionBit: number;

  @Prop({ instance: Number })
  lastLogin: number;
}


export type UsersDocument = HydratedDocument<UsersModel>;
export const UserSchema = SchemaFactory.createForClass(UsersModel);
