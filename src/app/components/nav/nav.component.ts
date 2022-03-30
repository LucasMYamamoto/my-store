import { Category } from './../../../models/product.model';
import { CategoriesService } from './../../services/categories.service';
import { ProductsService } from './../../services/products.service';
import { StoreService } from 'src/app/services/store.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from 'src/models/user.model';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  activeMenu = false;
  counter = 0;
  profile: User | null = null;
  categories: Category[] = [];
  constructor(
    private storeService: StoreService,
    private authService: AuthService,
    private productsService: ProductsService,
    private categoriesService: CategoriesService
  ) {

  }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length;
    });
    this.getAllCategories();
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  login() {
    // this.authService.login('sebas@mail.com', '1212')
    // .subscribe(rta => {
    //   this.token = rta.access_token;
    //   console.log(this.token);
    //   this.getProfile();
    // });
    this.authService.loginAndGet('lucas@gmail.com', '12345')
    .subscribe(user => {
      this.profile = user;
    });
  }

  // getProfile() {
  //   this.authService.getProfile()
  //   .subscribe(user => {
  //     this.profile = user;
  //   });
  // }

  getAllCategories(){
    this.categoriesService.getAll().subscribe( data => {
      this.categories = data;
    });
  }
}
