import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CarAddComponent } from '../components/car-add/car-add.component';
import { Car } from '../models/car';
import { CarDetail } from '../models/carDetail';
import { CarDto } from '../models/carDto';
import { ItemResponseModel } from '../models/itemResponseModel';

import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';


@Injectable({
  providedIn: 'root',
})
export class CarService {
  constructor(private httpClient: HttpClient) {}

  getCars(): Observable<ListResponseModel<CarDto>> {
    let newUrl = environment.apiUrl + 'cars/getallcardetails';
    return this.httpClient.get<ListResponseModel<CarDto>>(newUrl);
  }

  getCarById(carId: number): Observable<ItemResponseModel<CarDto>> {
    let newUrl = environment.apiUrl + 'cars/getcarbyid?carId=' + carId;
    return this.httpClient.get<ItemResponseModel<CarDto>>(newUrl);
  }

  getCarByBrand(brandId: Number): Observable<ListResponseModel<CarDto>> {
    let newPath =
      environment.apiUrl + `cars/getcarbybrandid?brandid=${brandId}`;
    return this.httpClient.get<ListResponseModel<CarDto>>(newPath);
  }

  getCarByColor(colorId: Number): Observable<ListResponseModel<CarDto>> {
    let newPath =
      environment.apiUrl + `cars/getcarbycolorid?colorId=${colorId}`;
    return this.httpClient.get<ListResponseModel<CarDto>>(newPath);
  }

  getCarByBrandAndColor(
    brandId: Number,
    colorId: Number
  ): Observable<ListResponseModel<CarDto>> {
    let newPath =
      environment.apiUrl +
      `cars/getbybrandandcolor?brandId=${brandId}&colorid=${colorId}`;
    return this.httpClient.get<ListResponseModel<CarDto>>(newPath);
  }

  addCar(car: Car): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      environment.apiUrl + 'cars/add',
      car
    );
  }

  update(car: Car): Observable<ListResponseModel<Car>> {
    let newPath = environment.apiUrl + 'cars/update';
    return this.httpClient.post<ListResponseModel<Car>>(newPath, car);
  }

  delete(car: Car): Observable<ItemResponseModel<Car>> {
    let newPath = environment.apiUrl + 'cars/delete';
    return this.httpClient.post<ItemResponseModel<Car>>(newPath, car);
  }
}
