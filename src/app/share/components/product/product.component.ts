import { Product } from 'src/app/models/product.model';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent  {

  @Output() addedProduct = new EventEmitter<Product>();
  @Output() showProduct = new EventEmitter<string>();
  @Input() product: Product = {
    id: '',
    title: '',
    price: 0,
    images: [],
    description: '',
    category:  {
      id:0,
    name: ''}
  }

  constructor() { }

  onAddToCart() {
    this.addedProduct.emit(this.product);
  }

  onShowDetail(){
    this.showProduct.emit(this.product.id);
  }

}
