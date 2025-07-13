import Category from "./Category";
import UserSchema from "./User";

export type ProductSize =
  | "XS"
  | "S"
  | "SMALL"
  | "M"
  | "MEDIUM"
  | "L"
  | "LARGE"
  | "XL"
  | "XXL"
  | "XXXL";

export interface ProductColor {
  name: string;
  code: string;
}

export default interface ProductSchema {
  _id: string;
  name: string;
  thumbnail: string;
  images: string[];
  description: string;
  colors: ProductColor[];
  sizes: ProductSize[];
  price: number;
  category: Category;
  user: UserSchema;
  createdAt: Date;
  updatedAt: Date;
}
