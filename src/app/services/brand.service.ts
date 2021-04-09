import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Brand } from '../models/brand';
import { ItemResponseModel } from '../models/itemResponseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';


@Injectable({
  providedIn: 'root',
})
export class BrandService {
  constructor(private httpClient: HttpClient) {}

  getBrands(): Observable<ListResponseModel<Brand>> {
    let newUrl = environment.apiUrl + 'brands/getall';
    return this.httpClient.get<ListResponseModel<Brand>>(newUrl);
  }

  addBrand(brand: Brand): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      environment.apiUrl + 'brands/add',
      brand
    );
  }

  update(brand: Brand): Observable<ListResponseModel<Brand>> {
    let newPath = environment.apiUrl + 'brands/update';
    return this.httpClient.post<ListResponseModel<Brand>>(newPath, brand);
  }

  delete(brand: Brand): Observable<ListResponseModel<Brand>> {
    let newPath = environment.apiUrl + 'brands/delete';
    return this.httpClient.post<ListResponseModel<Brand>>(newPath, brand);
  }

  getById(id: number): Observable<ItemResponseModel<Brand>> {
    let newPath = environment.apiUrl + 'brands/getbybrandid?id=' + id;
    return this.httpClient.get<ItemResponseModel<Brand>>(newPath);
  }
}
