import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Car } from '../models/car';
import { CarDetail } from '../models/carDetail';
import { CarDto } from '../models/carDto';
import { ItemResponseModel } from '../models/itemResponseModel';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CarDetailService {
  constructor(private httpClient: HttpClient) {}

  getCarDetail(carId: Number): Observable<ItemResponseModel<CarDetail>> {
    let newPath =
      environment.apiUrl + 'cars/getcardetailwithimage?carId=' + carId;
    return this.httpClient.get<ItemResponseModel<CarDetail>>(newPath);
  }


}
