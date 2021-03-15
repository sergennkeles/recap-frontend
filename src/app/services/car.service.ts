import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Car } from '../models/car';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  constructor(private httpClient: HttpClient) {}

  getCars(): Observable<ListResponseModel<Car>> {
    let newUrl = environment.apiUrl + 'cars/getallcardetails';
    return this.httpClient.get<ListResponseModel<Car>>(newUrl);
  }

  getCarByBrand(brandId: Number): Observable<ListResponseModel<Car>> {
    let newPath =
      environment.apiUrl + `cars/getcarbybrandid?brandid=${brandId}`;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarByColor(colorId: Number): Observable<ListResponseModel<Car>> {
    let newPath =environment.apiUrl + `cars/getcarbycolorid?colorId=${colorId}`;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
}
