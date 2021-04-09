import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ItemResponseModel } from '../models/itemResponseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  getbyid(id: number): Observable<ItemResponseModel<User>> {
    let newPath = environment.apiUrl + 'users/getbyuserid?userId=' + id;
    return this.httpClient.get<ItemResponseModel<User>>(newPath);
  }
// profile editlemek için
  getByMail(email: string): Observable<ItemResponseModel<User>> {
    let newPath = environment.apiUrl + 'users/getbymail?email=' + email;
    return this.httpClient.get<ItemResponseModel<User>>(newPath);
  }

  
  update(user: User): Observable<ResponseModel> {
    let newPath = environment.apiUrl + 'users/update';
    return this.httpClient.post<ResponseModel>(newPath, user);
  }
}
