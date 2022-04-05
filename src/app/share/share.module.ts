import { SwiperModule } from 'swiper/angular';
import { RouterModule } from '@angular/router';
import { ProductsComponent } from './../share/components/products/products.component';
import { ProductComponent } from './../share/components/product/product.component';
import { HighlightDirective } from './directives/highlight.directive';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReversePipe } from './pipes/reverse.pipe';
import { ImgComponent } from './components/img/img.component';

@NgModule({
  declarations: [
    ImgComponent,
    ProductComponent,
    ProductsComponent,
    TimeAgoPipe,
    ReversePipe,
    HighlightDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    SwiperModule
  ],
  exports: [
    ImgComponent,
    ProductComponent,
    ProductsComponent,
    TimeAgoPipe,
    ReversePipe,
    HighlightDirective,
  ]
})
export class ShareModule { }
