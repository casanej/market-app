import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema({ collection: 'users' })
export class UsersModel {
  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  lastLogin: number;
}


export type UsersDocument = HydratedDocument<UsersModel>;
export const UserSchema = SchemaFactory.createForClass(UsersModel);
