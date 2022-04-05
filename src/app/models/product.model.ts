import { Category } from './category.model';

export interface Product {
  id: string;
  title: string;
  price: number;
  images: string [];
  description: string;
  category: Category;
  taxes?: number;
}

//Data Transfer Object
export interface CreateProductDTO extends Omit<Product, 'id' |'category'>{
  categoryId: number;
}

//Partial - All arguments are optional
export interface UpdateProductDTO extends Partial<CreateProductDTO> {}

