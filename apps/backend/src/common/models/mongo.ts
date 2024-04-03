import { ObjectId } from "mongoose";

export type WithId<Model> = Model & { _id: ObjectId };
export type WithVersion<Model> = Model & { __v: number };
export type WithIdAndVersion<Model> = WithId<WithVersion<Model>>;