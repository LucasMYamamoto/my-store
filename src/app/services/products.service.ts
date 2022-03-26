import { checkTime } from './../interceptors/time.interceptor';
import { Product, CreateProductDTO, UpdateProductDTO } from './../../models/product.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { retry, catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { throwError, zip } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl: string = `${environment.API_URL}/api/products`;

  constructor(
    private http: HttpClient,
  ) { }

  getAllProducts(limit?: number, offset?: number) {
    let params = new HttpParams();
    if (limit && offset) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<Product[]>(this.apiUrl, { params, context: checkTime() })
      .pipe(
        retry(3),
        map(products => products.map(item => {
          return {
            ...item,
            taxes: .21 * item.price
          }
        }))
      );
  }

  fetchReadAndUpdate(id: string, dto: UpdateProductDTO) {
    return zip(
      this.getProduct(id),
      this.update(id, dto)
    );
  }


  getProduct(id: string) {
    return this.http.get<Product>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === HttpStatusCode.Conflict) {
            return throwError('Algo esta fallando en el servidor');
          }
          if (error.status === HttpStatusCode.NotFound) {
            return throwError('El producto no existe!');
          }
          if (error.status === HttpStatusCode.Unauthorized) {
            return throwError('No se encuentra autorizado a realizar esta petición');
          }
          return throwError('Ups algo salio mal...');
        })
      )
  }

  getProductByPage(limit: number, offset: number) {
    return this.http.get<Product[]>(`${this.apiUrl}`, { params: { limit, offset } });
  }

  create(dto: CreateProductDTO) {
    return this.http.post<Product>(this.apiUrl, dto);
  }

  update(id: string, dto: UpdateProductDTO) {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, dto);
  }

  delete(id: string) {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }

}
// JWT JSON Web Token
