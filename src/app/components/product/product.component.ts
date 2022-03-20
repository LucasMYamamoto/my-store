import { Product } from 'src/models/product.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Output() addedProduct = new EventEmitter<Product>();
  @Input() product: Product = {
    id: '',
    title: '',
    price: 0,
    image: '',
    description: '',
    category: ''
  }
  ngOnInit(): void {
    console.log('Try');
  }
  constructor() { }

  onAddToCart() {
    this.addedProduct.emit(this.product);
  }

}
