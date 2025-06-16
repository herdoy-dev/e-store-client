export default interface Category {
  _id: string;
  name: string;
}

export interface CategoryResponse {
  success: boolean;
  message: string;
  result: Category[];
}
