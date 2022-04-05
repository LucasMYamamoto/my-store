import { CreateProductDTO } from '../models/product.model';
import { CreateUserDTO, User } from '../models/user.model';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl: string = `${environment.API_URL}/api/users`;
  constructor(
    private http: HttpClient
  ) { }

  create(dto: CreateUserDTO){
    return this.http.post<User[]>(this.apiUrl,dto);
  }

  getAll() {
    return this.http.get<User[]>(this.apiUrl);
  }
}
