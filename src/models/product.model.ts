export interface Category {
  id: string;
  name: string;
}
export interface Product {
  id: string;
  title: string;
  price: number;
  images: string [];
  description: string;
  category: Category;
}

//Data Transfer Object
export interface CreateProductDTO extends Omit<Product, 'id' |'category'>{
  categoryId: number;
}

//Partial - All arguments are optional 
export interface UpdateProductDTO extends Partial<CreateProductDTO> {}

