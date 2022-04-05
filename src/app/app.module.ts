import { NotFoundComponent } from './not-found/not-found.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { TimeInterceptor } from './interceptors/time.interceptor';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuicklinkModule} from 'ngx-quicklink';



//SwiperJS
import { SwiperModule } from 'swiper/angular';


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    QuicklinkModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TimeInterceptor, multi: true },
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
