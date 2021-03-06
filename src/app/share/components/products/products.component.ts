import { ProductsService } from '../../../services/products.service';
import { Product, CreateProductDTO, UpdateProductDTO } from '../../../models/product.model';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { isNgTemplate } from '@angular/compiler';
import { StoreService } from 'src/app/services/store.service';
import { subSeconds } from 'date-fns';
import { subscribeOn, switchMap, zip } from 'rxjs';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  total: number = 0;
  myShoppingCart: Product[] = [];
  @Input() products: Product[] = [];
  // @Input() productId: string | null = null;
  @Input()
  set productId(id: string | null) {
    if (id) {
      this.onShowDetail(id);
    }
  };
  @Output() loadMore = new EventEmitter();
  showProductDetail = false;
  today = new Date();
  date = new Date(2025, 7, 8);

  productChosen: Product = {
    id: '',
    title: '',
    price: 0,
    images: [],
    description: '',
    category: {
      id: 0,
      name: ''
    }
  }


  statusDetail: 'loading' | 'success' | 'error' | 'initial' = 'initial';

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetail(id: string) {
    this.statusDetail = 'loading';
    // console.log('id product', id);
    if (!this.showProductDetail) {
      this.showProductDetail = true
    }
    this.productsService.getProduct(id)
      .subscribe(data => {
        // this.toggleProductDetail();
        this.productChosen = data;
        this.statusDetail = 'success';
      }, errorMsg => {
        window.alert(errorMsg);
        // console.log(response);
        this.statusDetail = 'error';
      })
  }

  readAndUpdate(id: string) {
    this.productsService.getProduct(id)
      .pipe(
        switchMap((product) => this.productsService.update(product.id, { title: 'change' })),
      )
      .subscribe(data => {
        console.log(data);
      });
    this.productsService.fetchReadAndUpdate(id, { title: 'change' })
      .subscribe(response => {
        const read = response[0];
        const update = response[1];
      })
  }

  createNewProduct() {
    const product: CreateProductDTO = {
      title: 'Nuevo producto',
      description: ' Descripcion Lorem Ipsum',
      images: ['https://picsum.photos/id/237/200/300'],
      price: 1000,
      categoryId: 2,
    }
    this.productsService.create(product)
      .subscribe(data => {
        console.log('product', data);
        this.products.unshift(data);
      });
  }

  updateProduct() {
    const changes = {
      title: ' Nuevo Titulo',
      description: ' Lorem Ipsum Ate Logo'
    }
    const id = this.productChosen.id;
    this.productsService.update(id, changes)
      .subscribe(data => {
        console.log('Update', data);
        const productIndex = this.products.findIndex(item => item.id === this.productChosen.id);
        this.products[productIndex] = data;
      });
  }

  deleteProduct() {
    const id = this.productChosen.id;
    this.productsService.delete(id)
      .subscribe(() => {
        const productIndex = this.products.findIndex(item => item.id === this.productChosen.id);
        this.products.splice(productIndex, 1);
        this.showProductDetail = false;
      });
  }

  onLoadMore() {
    this.loadMore.emit();
  }

}
